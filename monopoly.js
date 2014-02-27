/* Gestion du Monopoly */

/* TODO : Permettre l'achat de terrain hors strategie quand on est blinde et qu'on a deja des groupes et des constructions dessus */
/* -- TODO : Echange uniquement quand tous les terrains sont vendus. La banque vend (quand on achete pas) ou quand un joueur perd */
/* GetBudget quand Cheap tres dur (evaluation du terrain le plus cher). Ponderer avec l'existance de constructions pour forcer a construire */
/* TODO : proposer tout de même un terrain si deja une oldProposition */
/* -- TODO : mettre un plafond sur une proposition (fonction logarithmique : (14-ln(x)*x) => marche pas */
/* -- BUG : echange un terrain contre un terrain du meme groupe */
/* TODO : changer strategie quand deux terrains du meme groupe. Ne pas les enchanger contre une merde */
/* --TODO : plafonner argent a mettre dans une enchere (depend du prix de base). Encore trop cher (gare a 60K). Moins d'importance sur une gare */
/* TODO : pour contre propal, demander argent si besoin de construire */
/* --TODO : integrer les contres sur les encheres (n'encherie que si la personne vraiment interesse pose une enchere */
/* IDEE : Cassandra, Ring, Hash */
/* BIG TODO : implementation du des rapide */
/* TODO : pour echange, si argent dispo et adversaire dans la deche, on propose une grosse somme (si old proposition presente) */

var DEBUG = false;
var IA_TIMEOUT = 1000; // Temps d'attente pour les actions de l'ordinateur

/* Gestion des variantes, case depart (touche 40000) et parc gratuit (touche la somme des amendes) */
/* Conf classique : false,false,true,true */
var VARIANTES = {
    caseDepart: false, 		// Double la prime sur la case depart
    parcGratuit: false, 	// Toutes les taxes sont verses au parc gratuit
    enchereAchat: false, 	// Permet la mise aux encheres d'un terrain qu'un joueur ne veut pas acheter
	echangeApresVente: false,	// Permet d'echanger des terrains meme quand ils ne sont pas vendus
}

var stats = {	// Statistiques
	nbTours:0,
	heureDebut:new Date(),
	positions:[]
}	
var nbTours = 0; // Nombre de tours de jeu depuis le depuis (nb de boucle de joueurs)

var CURRENCY = "F.";

/* Dimensions du plateau */
var largeur = 65;
var hauteur = 100;
var total = (largeur * 9) / 2;
var plateauSize = 800;
var centre = 400;
var bordure = 20;
var largeurPion = (largeur - 5) / 3;

// Parametrage des titres
var titles = {};
	
function ParcGratuit(axe, pos) {
    this.id = axe + "-" + pos;
    this.montant = null;

    this.drawing = DrawerFactory.getCaseSpeciale(0, "Parc Gratuit");
    Drawer.add(this.drawing);

    this.setMontant = function (montant) {
        this.montant = montant;
        $('#idMontantParc > span').text(this.montant);
    }

    this.payer = function (montant) {
        this.setMontant(this.montant + montant);
    }

    this.action = function () {
		var _self = this;
        return InfoMessage.create(GestionJoueur.getJoueurCourant(),"Parc gratuit", "lightblue", "Vous gagnez " + this.montant + " " + CURRENCY, function (param) {
            param.joueur.gagner(param.montant);
            _self.setMontant(0);
            GestionJoueur.change();
        }, {
            joueur: GestionJoueur.getJoueurCourant(),
            montant: this.montant
        });
    }
    this.setMontant(0);
}

function CarteAction(libelle,carte,title,color,triggerLabel){
	this.carte = carte;
	this.action = function(){
		return InfoMessage.create(GestionJoueur.getJoueurCourant(),title, color, libelle, function (param) {
			$.trigger('monopoly.' + triggerLabel + '.message', {
				joueur: GestionJoueur.getJoueurCourant(),
				message: libelle
			});
			carte.action(GestionJoueur.getJoueurCourant());
		}, {});
	}
}

function CarteChance(libelle, carte) {
	CarteAction.call(this,libelle,carte,titles.chance,"lightblue","chance");	   
}

function CarteCaisseDeCommunaute(libelle, carte) {
	CarteAction.call(this,libelle,carte,titles.communaute,"pink","caissecommunaute");	           
}

// Cree le comportement lorsque le joueur arrive sur la carte
function doActions() {
	var fiche = GestionFiche.getById(GestionJoueur.getJoueurCourant().pion.etat + "-" + GestionJoueur.getJoueurCourant().pion.position);
	if (fiche == null) {
		GestionJoueur.change();
		return;
	}
	var buttons = fiche.action(); // Recupere les actions jouables en tombant sur cette case 
	// une fois l'action cree, le joueur doit faire une action
	GestionJoueur.getJoueurCourant().actionApresDes(buttons, fiche);
}

function formatTempsJeu(){		
	var time = Math.round((new Date().getTime() - stats.heureDebut)/1000);
	if(time < 60){
		return sec + " sec";
	}
	var sec = time%60;
	time = Math.round(time/60);
	return time + " min et " + sec + " sec";
}

function writePositions(){
	var str = "position;nb";
	for(var p in stats.positions){
		str += "\n" + p + ";" + stats.positions[p];
	}
	return str;
}

	/* Gere le fonctionnement du des */
	var GestionDes = {
		nbAnimation:8,
		cube:{des1:null,des2:null},
		des1:0,
		des2:0,
		nbDouble:0,	// Nombre de double de suite pour le joueur en cours
		rollColor:'#000000',
		init:function(rollColor){
			this.cube.des1 = DrawerFactory.getDes(150, 200, 50);
			this.cube.des2 = DrawerFactory.getDes(210, 200, 50);
			Drawer.addRealTime(this.cube.des1);
			Drawer.addRealTime(this.cube.des2);
			this.rollColor = rollColor;
		},
		resetDouble:function(){
			this.nbDouble = 0;
		},
		_rand:function(){
			return Math.round((Math.random() * 1000)) % 6 + 1;
		},
		/* Action avant le lancement du des */
		before:function(callback){
			if (GestionJoueur.getJoueurCourant().enPrison) {
				// Propose au joueur de payer ou utiliser une carte
				var buttons = InfoMessage.createPrison(GestionJoueur.getJoueurCourant(),GestionJoueur.getJoueurCourant().nbDouble, function () {
					callback();
				});
				GestionJoueur.getJoueurCourant().actionAvantDesPrison(buttons);
			} else {
				callback();
			}
		},
		/* Cas lorsque le joueur est en prison */
		treatPrison:function(message){
			var j = GestionJoueur.getJoueurCourant();
			if (this.isDouble()) {
				MessageDisplayer.write(GestionJoueur.getJoueurCourant(), message + " et sort de prison");
				var buttons = InfoMessage.create(GestionJoueur.getJoueurCourant(),"Libere de prison", "lightblue", "Vous etes liberes de prison grace a un double", function () {
					GestionJoueur.getJoueurCourant().exitPrison();
					GestionDes.endLancer();
				}, {});
				GestionJoueur.getJoueurCourant().actionApresDes(buttons, null);
				return;
			} else {
				if (j.nbDouble == 2) {
					MessageDisplayer.write(j, message + " et sort de prison en payant " + CURRENCY + " 5.000");
					var buttons = InfoMessage.create(j,"Libere de prison", "lightblue", "Vous etes liberes de prison, mais vous devez payer " + CURRENCY + " 5.000 !", function () {
						j.payerParcGratuit(InitMonopolt.plateau.parcGratuit,5000, function () {
							j.exitPrison();
							GestionDes.endLancer();
						});
					}, {});
					j.actionApresDes(buttons, null);
					return;
				} else {
					MessageDisplayer.write(j, message + " et reste en prison");
					j.nbDouble++;
					var buttons = InfoMessage.create(j,"Tour " + j.nbDouble, "red", "Vous restez en prison, vous n'avez pas fait de double.", function () {
						GestionJoueur.change();
					}, {});
					j.actionApresDes(buttons, null);
					return;
				}
			}
		},
		/* Action apres le lancement des des */
		/* Regle de gestion 
		 * 1 - Le joueur peut payer 5000 Frs ou utiliser une carte sortie de prison avant de lancer les des
		 * 2 : Le joueur fait un double ou a payer, il sort
		 * 3 - Le joueur atteint sont 3eme lancer, il paie
		 * 4 - Pas de double, il reste en prison
		 * */
		after:function(){
			var message = "lance les dés et fait " + (this.total()) + " (" + this.des1 + " et " + this.des2 + ") ";
			// Separer le code
			if (GestionJoueur.getJoueurCourant().enPrison == true) {
				this.treatPrison(message);
				return;
			} else {
				if (this.isDouble()) {
					if (this.nbDouble >= 2) {
						// Creer un message
						var buttons = InfoMessage.create(GestionJoueur.getJoueurCourant(),"Allez en prison", "red", "Vous avez fait 3 doubles, vous allez en prison", function () {
							MessageDisplayer.write(GestionJoueur.getJoueurCourant(), message + ", a fait 3 doubles et va en prison");
							$('#informationsCentrale').text("3eme double, allez en PRISON");
							// On met des valeurs differentes pour les des pour que le joueur ne rejoue pas
							GestionDes.des2++;
							// Le changement de joueur lorsque le deplacement est termine
							GestionJoueur.getJoueurCourant().goPrison();
						}, {});
						GestionJoueur.getJoueurCourant().actionApresDes(buttons, null);
						return;
					} else {
						this.nbDouble++;
						MessageDisplayer.write(GestionJoueur.getJoueurCourant(), message + " et rejoue");
					}
				}else{
					MessageDisplayer.write(GestionJoueur.getJoueurCourant(), message);
				}
			}
			GestionDes.endLancer();
		},
		endLancer:function(){
			GestionJoueur.getJoueurCourant().joueDes(this.total());
			if (this.isDouble()) {
				$('#informationsCentrale').html("Relancez");
			}else{
				$('#informationsCentrale').html("");
			}
		},
		isDouble:function(){
			return this.des1 == this.des2;
		},
		/* lancement du des */
		lancer:function(){
			this.before(function(){
				GestionDes.des1 = GestionDes._rand();
				GestionDes.des2 = GestionDes._rand();
				GestionDes._anime();
			});			
		},
		_anime:function(){
			$('.action-joueur').attr('disabled', 'disabled').addClass('disabled');   
			var nb = this.nbAnimation;
			var interval = setInterval(function () {
				if (nb-- < 0) {
					clearInterval(interval);
					GestionDes._drawCubes(GestionDes.des1,GestionDes.des2);
					GestionDes.after();
					return;
				}
				GestionDes._drawCubes(GestionDes._rand(),GestionDes._rand(),GestionDes.rollColor);
			}, 100);
		},
		_drawCubes:function(val1,val2,color){
			GestionDes.cube.des1.setValue(val1, color);
			GestionDes.cube.des2.setValue(val2, color);
		},
		/* Renvoie le total des dés */
		total:function(){
			return this.des1 + this.des2;
		}		
	}
	
	var InitMonopoly = {
		plateaux:null,
		listSauvegarde :null,
		panelPartie:null,
		plateauName:null,
		infoPlateau:null,
		init:function(debugValue){
			DEBUG = debugValue;
			this.panelPartie = $('#idPanelCreatePartie');
			MessageDisplayer.init('idInfoBox');
			InfoMessage.init('message');
			FicheDisplayer.init();
			this.initPanels();
			GestionEnchereDisplayer.init('idEncherePanel');
			CommunicationDisplayer.init('idCommunicationEchange');
			GestionTerrains.init({
				idArgentRestant:'#idArgentRestant',
				idCout:'#idCoutTotal',
				idPanel:'#housesPanel',
				idTerrains:'#idTerrains',
				idHypotheque:'#toHypotheque',
				idTerrainsHypotheque:'#idTerrainsHypotheques',
				idTerrainsConstructibles:'#idTerrainsConstructibles',
				idCoutAchat:'#coutAchats',
				idConstructions:'#resteConstructions'
			});
			
			 if (!DEBUG) {
				this.showPanel();
			} else {
				this.plateau.load('data-monopoly.json',function(){InitMonopoly._createGame({}, {});});
			}
		},
		plateau:{
			infos:null,
			name:null,
			parcGratuit:null,
			cartes:{caisseCommunaute:[],chance:[]},
			load:function(nomPlateau,callback){
				// On charge le plateau
				$.ajax({
					url: 'data/' + nomPlateau,
					dataType: 'json',
					context:this,
					success: function (data) {
						if(data.plateau == null){
							throw "Erreur avec le plateau " + nomPlateau;
						}
						this.name = nomPlateau;
						// Gestion de l'heritage
						if(data.extend){
							// On charge l'autre plateau et on en etend
							$.ajax({
								url:'data/' + data.extend,
								dataType:'json',
								context:this,
								success:function(dataExtend){
									var extendedData = $.extend(true,{},dataExtend,data);                           
									this._build(extendedData,callback);
								}
							});
						}
						else{
							this._build(data,callback);             
						}
					},
					error: function (a, b, c) {
						alert("Le plateau " + nomPlateau + " n'existe pas (" + 'data/' + nomPlateau + ")");
						return;
					}
				});
			},
			_build:function(data,callback){
				this.infos = data.plateau;
				DrawerFactory.addInfo('defaultImage',data.images.default || {});
				if(this.infos.type == 'circle'){
					DrawerFactory.setType('circle');
					$('.title').addClass('circle');
					$('#plateau').addClass('action-circle');
					$('#idSavePanel').arctext({radius: 80,dir:1})
					$('#idInfoBox').addClass('circle');
					$('#idInfoBox').unbind('mousewheel').bind('mousewheel',function(e,sens){
						var scroll=$('#idInfoBox').scrollTop() + (sens * e.deltaFactor * -0.7);
						$('#idInfoBox').scrollTop(scroll)
						e.preventDefault();
					});
				}
				
				CURRENCY = data.currency;
				titles = data.titles;
				this.infos.nomsJoueurs = this.infos.nomsJoueurs || [];
				
				GestionDes.init(this.infos.rollColor);
				$('#idLancerDes').click(function(){
					GestionDes.lancer();
				});
				Drawer.add(DrawerFactory.getPlateau(0, 0, plateauSize, plateauSize, this.infos.backgroundColor), 0); 				
				this._draw(data);
				Drawer.add(DrawerFactory.endPlateau(),2);
				Drawer.init(plateauSize, plateauSize);

				if (callback) {
					callback();
				}
			},
			_buildCartes:function(data,Instance){				
				return data!=null ? data.cartes.map(function(c){
					return new Instance(c.nom, CarteActionFactory.get(c));					
				}):[];				
			},
			_draw:function(data){
				$('#idSubTitle').text(this.infos.subtitle);
				this.parcGratuit = null;				
				var colors = [];
				var groups = [];
				var _self = this;
				
				this.cartes.chance = this._buildCartes(data.chance,CarteChance);
				this.cartes.caisseCommunaute = this._buildCartes(data.communaute,CarteCaisseDeCommunaute);
								
				$(data.fiches).each(function () {
					var fiche = null;
					if (this.colors != null && this.colors.length > 0 && groups[this.colors[0]] == null) {
						groups[this.colors[0]] = new Groupe(this.groupe, this.colors[0]);
					}
					switch (this.type) {
					case "propriete":
						fiche = new Fiche(this.axe, this.pos, this.colors, this.nom, this.prix, this.loyers, this.prixMaison);
						groups[this.colors[0]].add(fiche);
						break;
					case "compagnie":
						fiche = new FicheCompagnie(this.axe, this.pos, this.colors, this.nom, this.prix, this.loyers,data.images[this.img] || data.images.compagnie);
						groups[this.colors[0]].nom = 'Compagnie';
						groups[this.colors[0]].add(fiche);
						break;
					case "gare":
						fiche = new FicheGare(this.axe, this.pos, this.colors, this.nom, this.prix, this.loyers, data.images.gare);
						groups[this.colors[0]].nom = 'Gare';
						groups[this.colors[0]].add(fiche);
						break;
					case "chance":
						fiche = new CaseChance(this.axe, this.pos,data.images.chance,_self.cartes.chance);
						break;
					case "communaute":
						fiche = new CaseCaisseDeCommunaute(this.axe, this.pos,data.images.caisseDeCommunaute,_self.cartes.caisseCommunaute);
						break;
					case "taxe":
						fiche = new SimpleCaseSpeciale(this.nom, this.prix, this.axe, this.pos, data.images.taxe);
						break;
					case "prison":
						fiche = new CaseActionSpeciale(this.nom, function () {
							GestionJoueur.getJoueurCourant().goPrison();
						}, this.axe, this.pos);
						break;
					case "special":
						fiche = new CaseActionSpeciale(this.nom, function () {
							GestionJoueur.change();
						}, this.axe, this.pos);
						break;
					case "parc":
						_self.parcGratuit = new ParcGratuit(this.axe, this.pos);
						fiche = _self.parcGratuit;
						break;
					case "depart":
						fiche = new CaseActionSpeciale(this.nom, function () {
							if (VARIANTES.caseDepart) {
								GestionJoueur.getJoueurCourant().gagner((data.plateau.montantDepart || 20000)*2);
							} else {
								GestionJoueur.getJoueurCourant().gagner(data.plateau.montantDepart || 20000);
							}
							$.trigger('monopoly.depart', {
								joueur: GestionJoueur.getJoueurCourant()
							});
							GestionJoueur.change();
						}, this.axe, this.pos);
						break;
					}
					if(fiche!=null){
					    GestionFiche.add(fiche);
						if (fiche.color != null) {
							if (colors[fiche.color] == null) {
								// On genere un style
								$('style', 'head').prepend('.color_' + fiche.color.substring(1) + '{color:white;font-weight:bold;background-color:' + fiche.color + ';}\n');
								colors[fiche.color] = 1;
							}
						}
					}
				});
				this._calculateVoisins();
					
			},
			/* Calcule les voisins de chaque groupe */
			_calculateVoisins:function(){
				var currentGroupe = null;
				// Parcourt les fiches. On enregistre le groupe courant, quand changement, on defini le groupe precedent et calcule le suivant du precedent
				for (var i = 0; i < 42; i++) {
					var etat = Math.floor(i / 10) % 4;
					var pos = i % 40 - (etat * 10);
					var fiche = GestionFiche.get({
						axe: etat,
						pos: pos
					});
					if (fiche.groupe != null && fiche.constructible) {
						if (currentGroupe == null) {
							// initialisation
							currentGroupe = fiche.groupe;
						}
						if (!currentGroupe.equals(fiche.groupe)) { // Changement de groupe
							fiche.groupe.groupePrecedent = currentGroupe;
							currentGroupe.groupeSuivant = fiche.groupe;
							currentGroupe = fiche.groupe;
						}
					}
				}
			}
		},
		showPanel:function(){
			this._loadPlateaux();
			this._configSauvegardePanel();
			this.panelPartie.dialog({
				title: "Monopoly",
				closeOnEscape: false,
				modal: true,
				width: 400,
				buttons: [{
					text: "Valider",
					click: function(){InitMonopoly._loadOrCreateGame();}
				}]
			});
		},
		_loadOrCreateGame:function(){
			/* Chargement d'une partie */
			if (this.listSauvegarde.val() != "") {
				Sauvegarde.load(this.listSauvegarde.val());
				this.panelPartie.dialog('close');
			} else {
				this.plateau.load($('#idSelectPlateau').val(),function(){
                    var options = {};
                    $('#idPartie',this.panelPartie).find('select[name]').each(function(){
                        options[$(this).attr('name')] = $(this).val();
                    });
                    $('#idPartie',this.panelPartie).find(':checkbox[name]').each(function(){
                        options[$(this).attr('name')] = $(this).is(':checked');
                    });
                    $(':checkbox[name]', '#idVariantes').each(function () {
                        VARIANTES[$(this).attr('name')] = $(this).is(':checked');
                    });
					InitMonopoly._createGame(options);
				});
				this.panelPartie.dialog('close');
			}
		},
		/* Creer la partie apres le chargement du plateau */
		_createGame:function(options){
            var j = this.plateau.infos.nomsJoueurs.length > 0 ? this.plateau.infos.nomsJoueurs[0] : "";
			options = $.extend({},{nbPlayers:0,waitTimeIA:1,firstIA:false,joueur:j},options);

			for (var i = 0; i < options.nbPlayers; i++) {
				var nom = "Joueur " + (i+1);
				if(i == 0){
					nom = options.joueur;				
				}else{
					if(this.plateau.infos.nomsJoueurs.length > i){
						nom = this.plateau.infos.nomsJoueurs[i];
					}
				}
				GestionJoueur.create(i > 0 || options.firstIA, i,nom);            
			}
			this.afterCreateGame();
			GestionJoueur.change();

			/* Gestion des options */
			IA_TIMEOUT = options.waitTimeIA || IA_TIMEOUT;		  
		},
		afterCreateGame:function(){
			$('.info-joueur').tooltip({
				content: function () {
					var stats = GestionJoueur.getById($(this).data('idjoueur')).getStats();
					$('span[name]', '#infoJoueur').each(function () {
						$(this).html(stats[$(this).attr('name')]);
					});
					return $('#infoJoueur').html();
				}
			});
			// Panneau d'echange
			EchangeDisplayer.init('idPanelEchange', 'idSelectJoueurs', 'idListTerrainsJoueur', 'idListTerrainsAdversaire');	
		},
		/* Charge les plateaux de jeu disponible */
		_loadPlateaux:function(){
			this.plateaux = $('#idSelectPlateau');
			$.ajax({
				url:'data/plateaux.json',
				dataType:'json',
				context:this,
				success:function(data){
					if(data == null || data.plateaux == null){return;}
					data.plateaux.forEach(function(p){
						this.plateaux.append('<option value="' + p.url + '">' + p.name + '</option>');
					},this);
				}
			});
		},
		_configSauvegardePanel:function(){
			var sauvegardes = Sauvegarde.findSauvegardes();
			this.listSauvegarde = $('#idSauvegardes');
			var _self = this;
			if (sauvegardes.length > 0) {
				sauvegardes.forEach(function(s){
				//for (var i = 0; i < sauvegardes.length; i++) {
					//$('#idSauvegardes').append('<option value="' + sauvegardes[i].value + '">' + sauvegardes[i].label + '</option>');
					this.listSauvegarde.append('<option value="' + s.value + '">' + s.label + '</option>');
				},this);
				$('#idDeleteSauvegarde').unbind('click').bind('click', function () {
					if ($('option:selected',_self.listSauvegarde).length > 0) {
						if (confirm("Etes vous sur de vouloir supprimer cette sauvegarde : " + _self.listSauvegarde.val())) {
							Sauvegarde.delete(_self.listSauvegarde.val());
							$('option:selected',_self.listSauvegarde).remove();
						}
					}
				});
				$('#idLoadSauvegarde').unbind('click').bind('click', function () {
					if (_self.listSauvegarde.val() != "") {
						Sauvegarde.load(_self.listSauvegarde.val());
						_self.panelPartie.dialog('close');
					}
				});
			}
		},		
		initPanels:function(){
			$('#message').dialog({
				autoOpen: false
			});
			$('#message').prev().css("background", "url()");
			/* Gestion de la sauvegarde */
			$('#idSavePanel').click(function () {
				var name = Sauvegarde.isSauvegarde() ? prompt("Nom de la sauvegarde (si vide, defini par defaut)") : null;
				Sauvegarde.save(name);				
			});
			// panneau d'achats de maisons
			$('#achatMaisons').dialog({
				autoOpen: false,
				title: "Achat de maisons /hotels",
				width: 500,
				height: 300
			});
			// Liste des terrains libres
			$('#idTerrainsLibres').dialog({
				autoOpen:false,
				title:"Liste des terrains libre",
				width:350,
				height:300,
				buttons:[{text:'Fermer',click:function(){$('#idTerrainsLibres').dialog('close');}}],
				open:function(){showFreeTerrains();}
			});
		}
	}
	
    function showFreeTerrains(){
		$('#idTerrainsLibres').empty();
		var it = GestionFiche.getTerrainsLibres();
		while(it.hasNext()){
			var t = it.next();
			$('#idTerrainsLibres').append('<div style="font-weight:bold;color:' + t.color + '">' + t.nom + '</div>');
		}
	}

    function reset() {
        $('#informations-left').empty();
        $('#informations').empty();
        joueurs = [];
    }
	
var MessageDisplayer = {
    div: null,
    order: 0,
    init: function (id) {
        this.div = $('#' + id);
        this.bindEvents();
    },
    write: function (joueur, message) {
        MessageDisplayer.order++;
        var orderMessage = (DEBUG) ? (' (' + MessageDisplayer.order + ')') : '';
        this.div.prepend('<div><span style="color:' + joueur.color + '">' + joueur.nom + '</span> : ' + message + orderMessage + '</div>');
    },
    _buildTerrain: function (terrain) {
        return '<span style="font-weight:bold;color:' + terrain.color + '">' + terrain.nom + '</span>';
    },
    _buildProposition: function (proposition) {
        if (proposition == null) {
            return "";
        }
        var message = "";
        if (proposition.terrains.length > 0) {
            for (var i = 0; i < proposition.terrains.length; i++) {
                message += this._buildTerrain(proposition.terrains[i]) + ", ";
            }
        }
        if (proposition.compensation > 0) {
            message += " compensation : " + proposition.compensation + " " + CURRENCY;
        }
        return message;
    },
    bindEvents: function () {
        $.bind("monopoly.save", function (e, data) {
            MessageDisplayer.write({
                color: 'green',
                nom: 'info'
            }, 'sauvegarde de la partie (' + data.name + ')');
        }).bind("monopoly.depart", function (e, data) {
            MessageDisplayer.write(data.joueur, 's\'arrête sur la case départ');
        }).bind("monopoly.enchere.init", function (e, data) {
            MessageDisplayer.write(data.joueur != null ? data.joueur : {color:'black',nom:'La banque'}, 'met aux enchères ' + MessageDisplayer._buildTerrain(data.maison));
        }).bind("monopoly.enchere.fail", function (e, data) {
            MessageDisplayer.write({
                    color: 'red',
                    nom: 'Commissaire priseur'
                },
                'le terrain ' + MessageDisplayer._buildTerrain(data.maison) + ' n\'a pas trouvé preneur');
        }).bind("monopoly.enchere.success", function (e, data) {
            MessageDisplayer.write(data.joueur, 'achète aux enchères le terrain ' + MessageDisplayer._buildTerrain(data.maison) + " pour " + CURRENCY + " " + data.montant);
        }).bind("monopoly.caissecommunaute.message", function (e, data) {
            MessageDisplayer.write(data.joueur, 'carte caisse de communauté : ' + data.message);
        }).bind("monopoly.chance.message", function (e, data) {
            MessageDisplayer.write(data.joueur, 'carte chance : ' + data.message);
        }).bind("monopoly.acheteMaison", function (e, data) {
            MessageDisplayer.write(data.joueur, 'achète ' + MessageDisplayer._buildTerrain(data.maison));
        }).bind("monopoly.chezsoi", function (e, data) {
            MessageDisplayer.write(data.joueur, 'tombe sur ' + MessageDisplayer._buildTerrain(data.maison) + ". Il est chez lui.");
        }).bind("monopoly.visiteMaison", function (e, data) {
            MessageDisplayer.write(data.joueur, 'tombe sur ' + MessageDisplayer._buildTerrain(data.maison));
        }).bind("monopoly.vendMaison", function (e, data) {
            MessageDisplayer.write(data.joueur, 'vends ' + data.nbMaison + ' maison(s)</span>');
        }).bind("monopoly.payerLoyer", function (e, data) {
            var mais = data.maison;
            var m = '<span style="font-weight:bold;color:' + mais.color + '">' + mais.nom + '</span>';
            var jp = '<span style="color:' + mais.joueurPossede.color + '">' + mais.joueurPossede.nom + '</span>';
            MessageDisplayer.write(data.joueur, "tombe sur " + m + " et paye " + mais.getLoyer() + " " + CURRENCY + " à " + jp);
        }).bind("monopoly.newPlayer", function (e, data) {
            MessageDisplayer.write(data.joueur, "rentre dans la partie");
        }).bind("monopoly.hypothequeMaison", function (e, data) {
            MessageDisplayer.write(data.joueur, 'hypothèque ' + MessageDisplayer._buildTerrain(data.maison));
        }).bind("monopoly.leveHypothequeMaison", function (e, data) {
            MessageDisplayer.write(data.joueur, "lève l'hypothèque de " + MessageDisplayer._buildTerrain(data.maison));
        }).bind("monopoly.goPrison", function (e, data) {
            MessageDisplayer.write(data.joueur, "va en prison");
        }).bind("monopoly.exitPrison", function (e, data) {
            MessageDisplayer.write(data.joueur, "sort de prison");
        }).bind("monopoly.acheteConstructions", function (e, data) {
            var message = "";
            var achats = data.achats;
            if (achats.maison > 0) {
                message += "achète " + achats.maison + " maison(s) ";
            } else {
                if (achats.maison < 0) {
                    message += "vend " + (achats.maison * -1) + " maison(s) ";
                }
            }
            if (achats.hotel > 0) {
                message += ((message != "") ? " et " : "") + "achète " + achats.hotel + " hôtel(s) ";
            } else {
                if (achats.hotel < 0) {
                    message += ((message != "") ? " et " : "") + "vend " + (achats.hotel * -1) + " hôtel(s) ";
                }
            }
			// On affiche la liste des terrains
			if(achats.terrains!=null && achats.terrains.size() > 0){
				message+=" sur ";
				for(var id in achats.terrains){
					message+=MessageDisplayer._buildTerrain(achats.terrains[id]) + ", ";
				}
			}
            if (message != "") {
                MessageDisplayer.write(data.joueur, message);
            }
        }).bind("monopoly.echange.init", function (e, data) {
            var message = 'souhaite obtenir ' + MessageDisplayer._buildTerrain(data.maison) + ' auprès de ' + data.maison.joueurPossede.nom;
            MessageDisplayer.write(data.joueur, message);
        }).bind("monopoly.echange.propose", function (e, data) {
            MessageDisplayer.write(data.joueur, 'propose : ' + MessageDisplayer._buildProposition(data.proposition));
        }).bind("monopoly.echange.accept", function (e, data) {
            MessageDisplayer.write(data.joueur, 'accepte la proposition');
        }).bind("monopoly.echange.reject", function (e, data) {
            MessageDisplayer.write(data.joueur, 'rejete la proposition');
        }).bind("monopoly.echange.contrepropose", function (e, data) {
            MessageDisplayer.write(data.joueur, 'fait une contre-proposition : ' + MessageDisplayer._buildProposition(data.proposition));
        }).bind("monopoly.defaite", function (e, data) {
            MessageDisplayer.write(data.joueur, 'a perdu et quitte la partie');
        }).bind("monopoly.victoire", function (e, data) {
            MessageDisplayer.write(data.joueur, 'a gagné la partie');
        }).bind("monopoly.debug", function (e, data) {
            if (DEBUG) {
                MessageDisplayer.write({
                    color: 'red',
                    nom: 'debug'
                }, data.message);
            }
        });
    }
}
/*  DEBUG */
/* Achete des maisons pour le joueur courant, on passe les ids de fiche */
function buy(maisons) {
	for (var i in maisons) {
		GestionJoueur.getJoueurCourant().acheteMaison(GestionFiche.getById(maisons[i]));
	}
}