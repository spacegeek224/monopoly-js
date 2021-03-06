	 var DEBUG = true;
	 var valeurPas = 83;
	 var pasMaison = "15px";
	 var pas = "83px";
	 var des1;
	 var des2;
	 var nbDouble = 0;
	 var fiches = new Array();
	 var cartesChance = null;
	 var cartesCaisseCommunaute = null;
	 var parcGratuit = null;
	   
	 $(document).ready(function(){
	 parcGratuit = new ParcGratuit();
	 fiches["2-0"] = new CarteActionSpeciale("D�part",function(){joueurCourant.gagner(40000)},2,0);
	 fiches["2-1"] = new Fiche(2,1,["#812B5C","#DFA4C6"],"Boulevard de Belleville",4000,200,1000,3000,9000,16000,25000,5000);
	 fiches["2-2"] = new CaisseDeCommunaute(2,2);
	 fiches["2-3"] = new Fiche(2,3,["#812B5C","#DFA4C6"],"Rue Lecourbe",8000,400,2000,6000,18000,32000,45000,5000);
	 fiches["2-4"] = new CarteSpeciale("Impots sur le revenue",20000,2,4);
	 fiches["2-5"] = new FicheGare(2,5,["#000000","#ABABAB"],"Gare Montparnasse",20000,2500,5000,10000,20000);
	 fiches["2-6"] = new Fiche(2,6,["#119AEB","#98CEEE"],"Rue de Vaugirard",10000,600,3000,9000,27000,40000,55000,5000);
	 fiches["2-7"] = new Chance(2,7);
	 fiches["2-8"] = new Fiche(2,8,["#119AEB","#98CEEE"],"Rue de Courcelles",10000,600,3000,9000,27000,40000,55000,5000);
	 fiches["2-9"] = new Fiche(2,9,["#119AEB","#98CEEE"],"Avenue de la R�publique",12000,800,4000,10000,30000,45000,60000,5000);
	 fiches["3-0"] = new CarteActionSpeciale("Simple visite",function(){},3,0);
	 fiches["3-1"] = new Fiche(3,1,["#73316F","#DFB4DC"],"Boulevard de la Villette",14000,1000,5000,15000,45000,62500,75000,10000);
	 fiches["3-2"] = new FicheCompagnie(3,2,["lightgreen"],"Compagnie de distribution d'�lectricit�",15000,400,1000);
	 fiches["3-3"] = new Fiche(3,3,["#73316F","#CA83C6"],"Avenue de Neuilly",14000,1000,5000,15000,45000,62500,75000,10000);
	 fiches["3-4"] = new Fiche(3,4,["#73316F","#CA83C6"],"Rue de Paradis",16000,1200,6000,18000,50000,70000,90000,10000);
	 fiches["3-5"] = new FicheGare(3,5,["#000000","#ABABAB"],"Gare de Lyon",20000,2500,5000,10000,20000);
	 fiches["3-6"] = new Fiche(3,6,["#D16E2D","#FECC84"],"Avenue Mozart",18000,1400,7000,20000,55000,75000,95000,10000);
	 fiches["3-7"] = new CaisseDeCommunaute(3,7);
	 fiches["3-8"] = new Fiche(3,8,["#D16E2D","#ECA271"],"Boulevard Saint-Michel",18000,1400,7000,20000,55000,75000,95000,10000);
	 fiches["3-9"] = new Fiche(3,9,["#D16E2D","#ECA271"],"Place Pigalle",20000,1600,8000,22000,60000,80000,100000,10000);
	 fiches["0-0"] = parcGratuit;
	 fiches["0-1"] = new Fiche(0,1,["#D32C19","#F9AEA6"],"Avenue Matignon",22000,1800,9000,25000,70000,87500,105000,15000);
	 fiches["0-2"] = new Chance(0,2);
	 fiches["0-3"] = new Fiche(0,3,["#D32C19","#EC877B"],"Boulevard Malsherbes",22000,1800,9000,25000,70000,87500,105000,15000);
	 fiches["0-4"] = new Fiche(0,4,["#D32C19","#EC877B"],"Avenue Henri-Martin",22000,2000,10000,30000,75000,92500,110000,15000);
	 fiches["0-5"] = new FicheGare(0,5,["#000000","#ABABAB"],"Gare du Nord",20000,20000,2500,5000,10000,20000);
	 fiches["0-6"] = new Fiche(0,6,["#E6E018","#F8F587"],"Boulevard Saint-Honor�",26000,2200,11000,33000,80000,97500,115000,15000);
	 fiches["0-7"] = new Fiche(0,7,["#E6E018","#F8F587"],"Place de la bourse",26000,2200,11000,33000,80000,97500,115000,15000);
	 fiches["0-8"] = new FicheCompagnie(0,8,["lightgreen"],"Compagnie de distribution des eaux",15000,400,1000);
	 fiches["0-9"] = new Fiche(0,9,["#E6E018","#F8F587"],"Rue Lafayette",28000,2400,12000,36000,85000,102500,120000,15000);
	 fiches["1-0"] = new CarteActionSpeciale("Allez en prison",function(){joueurCourant.goPrison();},1,0);
	 fiches["1-1"] = new Fiche(1,1,["#11862E","#93D1A2"],"Avenue de Breteuil",30000,2600,13000,39000,90000,110000,127500,20000);
	 fiches["1-2"] = new Fiche(1,2,["#11862E","#93D1A2"],"Avenue Foch",30000,2600,13000,39000,90000,110000,127500,20000);
	 fiches["1-3"] = new CaisseDeCommunaute(1,3);
	 fiches["1-4"] = new Fiche(1,4,["#11862E","#93D1A2"],"Boulevard des Capucines",32000,2800,15000,45000,100000,120000,140000,20000);
	 fiches["1-5"] = new FicheGare(1,5,["#000000","#ABABAB"],"Gare Saint-Lazarre",20000,20000,2500,5000,10000,20000);
	 fiches["1-6"] = new Chance(1,6);
	 fiches["1-7"] = new Fiche(1,7,["#132450","#808EB0"],"Avenue des Champs Elys�es",35000,3500,17500,50000,110000,130000,150000,20000);
	 fiches["1-8"] = new CarteSpeciale("Taxe de luxe",10000,1,8,{src:"bijou.png",width:40,height:50});
	 fiches["1-9"] = new Fiche(1,9,["#132450","#808EB0"],"Rue de la Paix",40000,5000,20000,60000,140000,170000,200000,20000);
	 
	 cartesChance = [new CarteChance("Payer pour frais de scolarit� F 15.000",new PayerCarte(15000)),
				  new CarteChance("Amande pour exc�s de vitesse : F 1.500",new PayerCarte(1500)),
				  new CarteChance("Vous avez gagn� le prix de mots crois�s. Recevez F 10.000",new GagnerCarte(10000)),
				  new CarteChance("La banque vous verse un dividende de F 5.000",new GagnerCarte(5000)),
				  new CarteChance("Votre immeuble et votre pr�t rapportent. Vous devez toucher F 15.000",new GagnerCarte(15000)),
				  new CarteChance("Amande pour ivresse : F 2.000",new PayerCarte(2000))];
	 cartesCaisseCommunaute = [new CarteCaisseDeCommunaute("La vente de votre stock pour rapport F 5.000",new GagnerCarte(5000)),
				  new CarteCaisseDeCommunaute("Payez votre Police d'Assurance s'�levant � F 5.000",new PayerCarte(5000)),
				  new CarteCaisseDeCommunaute("Recevez votre revenu annuel F 10.000",new GagnerCarte(10000)),
				  new CarteCaisseDeCommunaute("Vous avez gagn� le deuxi�me Prix de Beaut�. Recevez F 1.000",new GagnerCarte(1000)),
				  new CarteCaisseDeCommunaute("Payez la note du M�decin F 5.000",new PayerCarte(5000)),
				  new CarteCaisseDeCommunaute("Les Contributions vous remboursent la somme de F 2.000",new GagnerCarte(2000)),
				  new CarteCaisseDeCommunaute("Erreur de la Banque en votre faveur Recevez F 20.000",new GagnerCarte(20000)),
				  new CarteCaisseDeCommunaute("Recevez votre int�r�t sur l'emprunt � 7 % F 2.500",new GagnerCarte(2500)),
				  new CarteCaisseDeCommunaute("Payez � l'H�pital F 10.000",new PayerCarte(10000)),
				  new CarteCaisseDeCommunaute("Vous h�ritez F 10.000",new GagnerCarte(10000))];
	 
	 init();
	 
	 });
	 
	 var lignes = new Array();
	 lignes[0] = new Ligne(0,{top:"-=" + 60},{left:"+=" + pas },{top:"112",left:"+=30"},{top:"112"},{left:"-=20"});
	 lignes[1] = new Ligne(0,{left:"+=" + 60},{top:"+=" + pas },{top:"+=30",left:"878"},{top:"-=5",left:"874"},{top:"-=20"});
	 lignes[2] = new Ligne(0,{top:"+=" + 60},{left:"-=" + pas },{top:"883",left:"-=35"},{top:"880",left:"-=10"},{left:"+=20"});
	 lignes[3] = new Ligne(0,{left:"-=" + 60},{top:"-=" + pas },{top:"-=30",left:"109"},{left:"105"},{top:"+=20"});
	 
	 function Ligne(i,decallage,move,maisonDecallage,hotelDecallage,decallageParMaison){
	   this.i = i;
	   this.decallage = decallage; // decallage pour sortir du passage
	   this.move = move; // deplacement sur le plateau
	   this.maisonDecallage = maisonDecallage; // decallage pour placer une maison
	   this.hotelDecallage = hotelDecallage;
	   this.decallageParMaison = decallageParMaison; // decallage pour placer une maison
	}
	   
	 function createMessage(titre,background,message,call,param){
	   $('#message').prev().css("background-color",background);
	   $('#message').dialog('option','title',titre);
	   $('#message').empty();
	   $('#message').append(message);
	   var button = {"Ok":function(){call(param);$('#message').dialog('close');}};
	   if(call!=null){
		$('#message').dialog('option','buttons',button);
	   }
	   $('#message').dialog('open');
	   return button;
	 }
	   
	 
	   
	 function buildMaison(){
	   var fiche = joueurCourant.getFichePosition();
	   if(fiche == null){return;}
	   if(fiche.nbMaison == 5){return;}
	   var l = lignes[joueurCourant.pion.etat];
	   var p = joueurCourant.pion.pion.position();
	   var id = 'maison_' + fiche.etat + "-" + fiche.pos + "-" + fiche.nbMaison;
	   if(fiche.nbMaison == 4){
		// hotel
		for(var i = 0 ; i < fiche.maisons.length ; i++){fiche.maisons[i].remove();}
		$('#plateau').append('<img src=\"hotel.gif\" id=\"' + id + '" style=\"width:35px;position:absolute;\"/>');
		$('#' + id).animate({top:"+=" + p.top,left:"+=" + p.left});
		$('#' + id).animate(l.hotelDecallage);
		fiche.maisons[0] = $('#' + id);
		fiche.hotel = true;
	   }
	   else{
		// maison
		$('#plateau').append('<img src=\"maison.gif\" id=\"' + id + '" style=\"width:25px;position:absolute;\"/>');
		$('#' + id).animate({top:"+=" + p.top,left:"+=" + p.left});
		$('#' + id).animate(l.maisonDecallage);
		for(var i = 0 ; i < fiche.nbMaison ; i++){$('#' + id).animate(l.decallageParMaison);}
		fiche.maisons[fiche.nbMaison] = $('#' + id);
	   }
	   fiche.nbMaison++;
	   
	 }
	  
	 function getNextPos(etat,position){
		  position++;
		  if(position == 10){
			  etat=(etat+1)%4;
			  position = 0;
		  }
		  return {"position":position,"etat":etat};
	 }
	 
	 var ETAT_LIBRE = 0;
	 var ETAT_ACHETE = 1;
	 
	 function ParcGratuit(id){
	   this.montant = null;
	   
	   this.case = new CaseSpeciale(0,"Parc Gratuit");
	   Drawer.add(this.case);
	   
	   this.setMontant = function(montant){
		this.montant = montant;
		this.case.titre = "Parc Gratuit " + this.montant + " F";
	   }
	   
	   this.payer = function(montant){
		this.setMontant(this.montant + montant);
	   }
	   
	   this.action = function(){
	   return createMessage("Parc gratuit","lightblue","Vous gagnez " + this.montant + " Frs",function(param){
		param.joueur.gagner(param.montant);
		parcGratuit.setMontant(0);
		changeJoueur();
	   },{joueur:joueurCourant,montant:this.montant});
	   }
	   
	   this.setMontant(0);
	   
	 }
	 
	 /* Objet qui gere le comportement (rapport a l'argent). Integre la prise de risque (position du jour) */
	 /* @risque : prise de risque entre 0 et 1 */
	 function Comportement(risque){
		  this.risque = risque;
		  this.probaDes = [0,2.77,5.55,8.33,11.1,13.8,16.7,13.8,11.1,8.33,5.55,2.77];
		  
		  this.calculMargeMontant = function(joueur,cout){
			  if(cout/joueur.montant < this.risque){
				  return 1;
			  }
			  return false;
		  }
		  
		  /* Se base sur les prochaines a risque qui arrive, renvoi un pourcentage */
		  this.calculRisque = function(joueur){
			  // On calcul le risque de tomber sur une case cher.
			  // On considere un risque quand on est au dessus de risque * montant d'amande)
			  var position = joueur.pion.position;
			  var etat = joueur.pion.etat;
			  var stats = 0;
			  for(var i = 1 ; i <= 12 ; i++){ 
				  var pos = getNextPos(etat,position);
				  etat = pos.etat;
				  position = pos.position;
				  var fiche = fiches[etat + "-" + position];
				  if(fiche!=null && fiche.getLoyer!=null && (fiche.getLoyer()>(joueur.montant * this.risque))){
					  stats+=this.probaDes[i-1];
				  }
			  }
			  return stats;
		  }
		  
		  // calcul le loyer le plus fort du joueur (et n'appartenant pas au joueur)
		  this.plusFortLoyer = function(joueur){
			  var max = 0;
			  for(var f in fiches){
				  if(f.getLoyer!=null && f.joueurPossede!=null 
					  && !joueur.equals(f.joueurPossede) && f.getLoyer() > max){
					  max = f.getLoyer();
				  }
			    }
			  return max;
		  }
	 }
	 
	 function CheapComportement(){
		  Comportement.call(this,0.2);
	 }
	 
	 function MediumComportement(){
		  Comportement.call(this,0.5);
	 }
	 
	 function HardComportement(){
		  Comportement.call(this,0.8);
	 }
	 
	 /* Objet qui gere la strategie. IL y a diff�rentes impl�mentations */
	 /* @colors : liste des groupes qui interessent le joueur */
	 /* @param agressif : plus il est eleve, plus le joueur fait de l'antijeu (achat des terrains recherches par les adversaires) */
	 function Strategie(colors,agressif){
		  this.groups = colors;
		  this.agressif = agressif;
		  
		  this.interetGlobal = function(propriete,joueur){
			  var i1 = this.interetPropriete(propriete);
			  var i2 = this.statutGroup(propriete,joueur);
			  if(i1 == false && i2 == 0){return 0;}
			  if(i1 == false && i2 == 2){return this.agressif;}	// agressif
			  if(i1 == true && i2 == 3){return 4;}
			  
			  return 1;
		  }
		  
		  /* Calcul l'interet pour la maison (a partir des groupes interessant) */
		  this.interetPropriete = function(propriete){
			  for(var color in this.groups){
				  if(this.groups[color] == propriete.color){
					  return true;
				  }
			  }
			  return false;
		  }
		  
		  /* Renvoie le statut de la famille : 
		  0 : toutes les proprietes sont libres
		  1 : s'il reste des libres apres celle ci
		  2 : si toutes appartiennent a une m�me personne sauf celle-ci
		  3 : autres */
		  // Prendre en compte si j'ai la famille, que c'est la derniere carte. Il faut passer les autres options de risques, prix. Il faut absolument acheter
		  this.statutGroup = function(propriete,joueur){
			  var nbTotal = 0;
			  var nbLibre = 0;
			  var dernierJoueur = null;
			  var nbEquals = 0;
			  var nbPossede= 0;
			  $(fiches).each(function(){
				  if(this.color == propriete.color){
					  nbTotal++;
					  if(this.etat == ETAT_LIBRE){
						  nbLibre++;
					  }
					  else{
						  if(this.joueurPossede.equals(dernierJoueur)){
							  nbEquals++;
						  }
						  if(this.joueurPossede.equals(joueur)){
							  nbPossede++;
						  }
						  dernierJoueur = this.joueurPossede;
					  }
				  }
			  });
			  if(nbLibre == nbTotal){
				  return 0;
			  }
			  if(nbLibre>0){
				  return 1;
			  }
			  if(nbLibre == 1 && nbEquals == nbTotal-1){
				  return 2;
			  }
			  if(nbLibre == 1 && nbPossede == nbTotal-1){
				  return 3;
			  }
			  return 4;
		  }
	 }
	 
	 /* Achete en prioriete les terrains les moins chers : bleu marine-812B5C, bleu clair-119AEB, violet-73316F et orange-D16E2D */
	 function CheapStrategie(){
		  Strategie.call(this,["#812B5C","#119AEB","#73316F","#D16E2D"],0);
	 }
	 
	 /* Achete en prioriete les terrains les moins chers : violet-73316F, orange-D16E2D, rouge-D32C19 et jaune-E6E018 */
	 function MediumStrategie(){
		  Strategie.call(this,["#73316F","#D16E2D","#D32C19","#E6E018"],1);
	 }
	 
	 /* Achete en prioriete les terrains les moins chers : rouge-D32C19, jaune-E6E018, vert-11862E et bleu fonc�-132450 */
	 function HardStrategie(){
		  Strategie.call(this,["#D32C19","#E6E018","#11862E","#132450"],2);
	 }
	 
	 /* Achete tout */
	 function CrazyStrategie(){
		  Strategie.call(this,["#812B5C","#119AEB","#73316F","#D16E2D","#D32C19","#E6E018","#11862E","#132450"],4);
	 }
	 
	 /* Joueur ordinateur */
	 /* Il faut, a la creation, definir le style de jeu : prudent (achat des deux premi�re lignes), agressif (ach�te tout)
	 mode fric (ach�te les plus chers).*/
	 function JoueurOrdinateur(numero,nom){
		  Joueur.call(this,numero,nom);
		  /* Agressivite */
		  this.agressivite = new MediumComportement();
		  /* Strat�gie : d�finit le comportement pour l'achat des maisons */
		  this.strategie = new CheapStrategie();
		  /* Comportement : d�finit le rapport � l'argent. Inclu la prise de risque */
		  this.comportement = null;
		  
		  // Fonction appelee lorsque le joueur a la main
		  this.joue = function(){
			  // on lance les d�s
			  lancerAnimerDes();
		  }
		  var current = this;
		  
		  // Fonction appelee lorsque les des sont lances et que le pion est place
		  this.actionApresDes = function(buttons,propriete){
			  if(buttons == null){
				  return;
			  }
			  setTimeout(function(){
				  if(buttons.Acheter!=null && propriete!=null){
					  var interet = current.strategie.interetPropriete(propriete);
					  var comp = current.comportement;
					  if(current.strategie.interetPropriete(propriete)){
						  buttons.Acheter();
						  return;
					  }
				  }
				  for(var i in buttons){
					  if(i!="Acheter"){
						  buttons[i]();
						  return;
					  }
				  }
			  },1000);
		  }
		  
		  // decide si achete ou non la maison
		  // On se base sur la politique, les fiches obtenues par les autres
		  this.gererAchat = function(boutonAchat){
			  boutonAchat.click();
		  }
	 }
	 
	 /* Represente un jour */
	 function Joueur(numero,nom){
	   this.numero = numero;
	   this.nom = nom;
	   this.montant = 100000;
	   this.maisons = new Array();
	   this.enPrison = false;
	   this.pion = null;	
	   this.equals = function(joueur){
		  if(joueur == null){
			  return false;
		  }
		  return this.numero == joueur.numero;
	   }
	   
	   // Cherche la position ou placer la nouvelle fiche (tri par couleur)
	   this.cherchePlacement = function(maison){
		for(var i = 0 ; i < this.maisons.length ; i++){
		  if(this.maisons[i].color == maison.color){
		    return this.maisons[i].input;
		  }
		}
	   }
	   
	   this.joueDes = function(sommeDes){
			  var nextCase = this.pion.deplaceValeursDes(sommeDes);
		    this.pion.goto(nextCase.axe,nextCase.pos,doActions);
	   }
	   
	   // Fonction a ne pas implementer avec un vrai joueur
	   this.joue = function(){}
	   
	   // Fonction a ne pas implementer avec un vrai joueur
	   this.actionApresDes = function(buttons,propriete){}
	   
	   // Achete une propriete
	   this.acheteMaison = function(maison,id){
		if(maison.isLibre()){
		  var m = this.cherchePlacement(maison);
		  var input = '<input type=\"button\" id=\"idInputFiche' + id + '\" class=\"ui-corner-all\" style=\"display:block;height:27px;width:280px;color:white;background-color:' + maison.color
			    + ';font-weight:bold\" value=\"' + maison.nom + '\" id=\"fiche_' + id + '\"/>';
		  if(m!=null){
		    m.after(input);
		  }
		  else{
		    joueurCourant.div.append(input);
		  }
		  
		  maison.input = $('#idInputFiche' + id);
		  maison.input.click(function(){
		    //fiches[id].openFiche();
		    openDetailFiche(fiches[id],$(this));
		  });
		  this.maisons[this.maisons.length] = maison;
		  maison.vendu(this); 
		  this.payer(maison.achat);
		}
	   }
	   
	   // Envoi le joueur (et le pion) en prison
	   this.goPrison = function(){
		this.enPrison = true;
		this.div.find('div:first').addClass('jail');
		this.nbDouble = 0;
		this.pion.goPrison();
	   }
	   
	   this.exitPrison = function(){
		  this.enPrison = false;
		  this.nbDouble = 0;
	   this.div.find('div:first').removeClass('jail');
	   }
	   
	   this.isEnPrison = function(){
		  return this.enPrison;
	   }
	   this.setDiv = function(div){
		this.div = div;
		this.setArgent(this.montant);
	   }
	   
	   this.setArgent = function(montant){
		this.montant = montant;
		this.div.find('.compte-banque').text(montant);
	   }
	   
	   this.payerParcGratuit = function(montant){
		this.montant-=montant;
		parcGratuit.payer(montant);
		this.setArgent(this.montant);
	   }
	   
	   this.setPion = function(color){
		this.pion = new Pion(color,this);
	   }
	   
	   this.payer = function(montant){
		this.montant-=montant;
		this.setArgent(this.montant);
	   }
	   this.gagner = function(montant){
		this.montant+=montant;
		this.setArgent(this.montant);
	   }
	   
	   this.getFichePosition = function(){
		return fiches[this.pion.etat + "-" + this.pion.position];
	   }
	   
	   this.findMaisonsConstructibles = function(){
		var mc = new Array();
		var colorsOK = new Array();
		var colorsKO = new Array();
		
		for(var i = 0 ; i < this.maisons.length ; i++){
		  var m = this.maisons[i];
		  if(m.constructible == true){
		    if(colorsOK[m.color] == true){
			 mc[mc.length] = m;  // on a la couleur, on ajoute
		    }
		    else{
			 if(colorsKO[m.color]==null){
			   // On recherche si on a toutes les couleurs
			   var ok = true; 
			   for(var f in fiches){
				if(fiches[f].constructible == true && fiches[f].color == m.color 
				    && (fiches[f].joueurPossede==null || fiches[f].joueurPossede.numero != this.numero)){
				  ok = false;
				}
			   }
			   if(!ok){
				colorsKO[m.color] = true;
			   }
			   else{
				colorsOK[m.color] = true;
				mc[mc.length] = m;
			   }
			 }
		    }
		  }
		}
	   return mc;
	   }
	 }
	 
	 function Pion(color,joueur){
	   this.etat = 2;
	   this.position = 0;
	   this.joueur = joueur;
	   this.pion = new PionJoueur(color,fiches["2-0"].case.getCenter().x,fiches["2-0"].case.getCenter().y);
	   Drawer.addRealTime(this.pion);
  
	   // Ca directement en prison, sans passer par la case depart, en coupant
	   this.goPrison = function(){
		this.goto(3,0,function(){});
	   }
	   
	   this.deplaceValeursDes = function(des){
		  var pos = this.position +des;
			 var axe = this.etat;
		  while(pos >= 10){
			  pos-=10;
			  axe=(axe+1)%4;
		  }      	
		  return {pos:pos,axe:axe}
	   }
	    
	   this.goto = function(etat,pos,call){
		  // decalage
		  var center = fiches[this.etat + "-" + this.position].case.getCenter();
		  this.pion.x = center.x;
		  this.pion.y = center.y;
		  console.log(joueurCourant.numero + " va a " + etat + "-" + pos);
		this.gotoCell(etat,pos,call);
	   }
	   
	   // Si on passe par la case depart, on prend 20000 Francs
	   this.treatCaseDepart = function(etatCible,posCible){
		  if(!this.joueur.isEnPrison() && this.position == 0 && this.etat == 2 && this.position!=posCible && this.etatCible != this.etat){
			  this.joueur.gagner(20000);
		  }
	   }
	   
	   this.goDirectToCell = function(etat,pos){
		  // On calcule la fonction affine
		  var p1 = fiches[this.etat + "-" + this.position].case.getCenter()
		  var p2 = fiches[etat + "-" + pos].case.getCenter()
		  // Si meme colonne, (x constant), on ne fait varier que y
		  if (p1.x == p2.x) {
		    //code
		  }
		  else{
		    var pente = (p1.y - p2.y)/(p1.x - p2.x);
		    var coef = p2.y - pente*p2.x;
		    var x = p1.x;
		    var sens = (p1.x > p2.x)?-1:1;
		    
		    
		    // On fait varier x et on calcule y. Le pas est 30
		    var _self = this;
		    var interval = setInterval(function(){		    
			    if((sens < 0 && x<=p2.x) || (sens > 0 && x >=p2.x)){
				    _self.etat = etat;
				    _self.position = pos;
				    clearInterval(interval);
				    return;
			    }
			    _self.pion.x = x;
			    _self.pion.y = pente * x + coef;
			    x+=30*((sens < 0)?-1:1);
		    },30);
		  }
	   }
  
	   // Se dirige vers une cellule donnee. Se deplace sur la case suivante et relance l'algo
	   this.gotoCell = function(etatCible,posCible,callback){
		   // Cas de la fin
		 if(this.etat == etatCible && this.position == posCible){
			  // On decale le pion
			  var decalage = fiches[this.etat + "-" + this.position].case.decalagePion();
			  this.pion.x = decalage.x;
			  this.pion.y = decalage.y;			
			  if(callback){callback();}
		    return;
		 }
		 var caseFiche = this.toNextCase();
		 this.treatCaseDepart(etatCible,posCible);
		 var pas = 5;
		 var field = "x";  // On varie sur l'axe x
		 if(this.pion.x == caseFiche.x){
		    field = "y";   // On varie sur l'axe y
		 }
		var _self = this;
		var distance = Math.abs(caseFiche[field] - this.pion[field]);
		var sens = (caseFiche[field] > this.pion[field])?1:-1;
		var interval = setInterval(function(){
		   if(distance > 0){
			 _self.pion[field]+=pas*sens;
			 distance-=pas;
		   }
		   else{
			 // Traitement fini
			 _self.pion.y = caseFiche.y;
			 _self.pion.x = caseFiche.x;
			 clearInterval(interval);
			 _self.gotoCell(etatCible,posCible,callback);
		   }
		},30);
	   }
	 
	   this.toNextCase = function(){
		 this.position++;
		 if(this.position >=10){
		    this.etat = (this.etat + 1)%4;
		    this.position = 0;
		 }
		 return fiches[this.etat + "-" + this.position].case.getCenter();
	   }
	 }
	 
	 function CarteActionSpeciale(titre,actionSpeciale,etat,pos){
	   this.titre = titre;
	   this.actionSpeciale = actionSpeciale;
	   
	   this.case = new CaseSpeciale(etat,titre);
		Drawer.add(this.case);
  
	   this.action = function(){
		this.actionSpeciale();
		changeJoueur();
	   }
	 }
	 
	 function CarteSpeciale(titre,montant,etat,pos,img){
	   this.case = new Case(pos,etat,null,titre,"F. " + montant,img);
		Drawer.add(this.case);
	   this.action = function(){
		return createMessage(titre,"lightblue","Vous devez payer la somme de " + montant + " Frs",function(param){
		param.joueur.payerParcGratuit(param.montant);
		changeJoueur();
		},{joueur:joueurCourant,montant:montant});
	   }
	 }
	 
	 function PayerCarte(montant){
	   this.montant = montant;
	   this.action = function(){
		joueurCourant.payerParcGratuit(this.montant);
	   }
	 }
	 
	 function GagnerCarte(montant){
	   this.montant = montant;
	   this.action = function(){
		joueurCourant.gagner(this.montant);
	   }
	 }
	 
	 function CarteChance(libelle,actionCC){
	   this.action = function(){
		return createMessage("Carte chance","lightblue",libelle,function(param){actionCC.action();changeJoueur();},{});
	   }
	 }
	 
	 function CarteCaisseDeCommunaute(libelle,actionCC){
	   this.action = function(){
		return createMessage("Caisse de communaut�","pink",libelle,function(param){actionCC.action();changeJoueur();},{});
	   }
	 }
	 
	 function Chance(etat,pos){
	    this.case = new Case(pos,etat,null,"Chance",null,{src:"interrogation.png",width:50,height:60});
	    Drawer.add(this.case);
	   this.action = function(){
		var c = cartesChance[Math.round((Math.random()*1000))%(cartesChance.length)];
		return c.action();
	   }
	 }
	 
	 function CaisseDeCommunaute(etat,pos){
	  this.case = new Case(pos,etat,null,"Caisse de communaut�",null,{src:"banque.png",width:50,height:50});
	  Drawer.add(this.case);
	    this.action = function(){
		var c = cartesCaisseCommunaute[Math.round((Math.random()*1000))%(cartesCaisseCommunaute.length)];
		return c.action();
	   }
	 }
  
  // Gere les dessins
  var Drawer = {
	  components:new Array(),
	firstComponents:new Array(),
	  height:0,
	  width:0,
	  interval:null,
	intervalRT:null,
	  canvas:null,
	canvasRT:null, //Canvas de temps reel
	  // ajoute un composant. On indique le canvas sur lequel il s'affiche
	  add:function(component,first){
	   component.getId = function(){return Drawer.canvas.canvas.id};
	   if(first){
		 Drawer.firstComponents.push(component);
	   }
	   else{
		 Drawer.components.push(component);
	   }
	  },
	  addRealTime:function(component){
	   component.getId = function(){return Drawer.canvasRT.canvas.id};
	   Drawer.components.push(component);
	  },
	  clear:function(canvas){
		  canvas.clearRect(0,0,this.width,this.height);
	  },
	/* Rafraichit un seul canvas */
	  refresh:function(canvas){
	  Drawer.clear(canvas);
	   for(var i = 0 ; i < Drawer.firstComponents.length ; i++){
		 if(Drawer.firstComponents[i].getId() === canvas.canvas.id){
		    Drawer.firstComponents[i].draw(canvas);
		 }
	  }
		  for(var i = 0 ; i < Drawer.components.length ; i++){
		 if(Drawer.components[i].getId() === canvas.canvas.id){
		    Drawer.components[i].draw(canvas);
		 }
	  }
	  },
	  // Refraichissement du graphique, time en ms
	  setFrequency:function(time,canvas){
		  if(canvas.canvas.id == "canvas"){
		 if(Drawer.interval!=null){
			  clearInterval(Drawer.interval);
		 }
		  Drawer.interval = setInterval(function(){Drawer.refresh(canvas);},time);
	   }
	   if(canvas.canvas.id == "canvas_rt"){
		 if(Drawer.intervalRT!=null){
			  clearInterval(Drawer.intervalRT);
		 }
		  Drawer.intervalRT = setInterval(function(){Drawer.refresh(canvas);},time);
	   }
	  },
	  init:function(width,height){
		  this.width = width;
		  this.height = height;
		  this.canvas = document.getElementById("canvas").getContext("2d");
	   this.canvasRT = document.getElementById("canvas_rt").getContext("2d");
		  this.canvas.strokeStyle='#AA0000';
	   this.canvasRT.strokeStyle='#AA0000';
		  this.setFrequency(2000,this.canvas);
	   this.setFrequency(50,this.canvasRT);
		  return this;
	  }
  };
  
  
  /* @param size : font-size */
  /* @param specificWidth : largeur specifique (plut�t que la largeur habituelle, largeur */
  function writeText(text,x,y,rotate,canvas,size,specificWidth){
	var width = specificWidth ||largeur;
	canvas.font=((size!=null)?size:"7") + "pt Times news roman";
	   // Mesure la longueur du mot
	   var mots = [text];
	   if(canvas.measureText(text).width > width-5){
		 // On split les mots intelligement (on regroupe)
		 var splitMots = text.split(" ");
		 var pos = 0;
		 for(var i = 0 ; i < splitMots.length ; i++){
		    if(pos > 0 && (canvas.measureText(mots[pos-1]).width + canvas.measureText(splitMots[i]).width) < width - 5){
			  // on concatene
			  mots[pos-1] = mots[pos-1] + " " + splitMots[i];
		    }
		    else{
			  mots[pos++] = splitMots[i];
		    }
		 }
	   }
	 canvas.save();
	 canvas.translate(x,y);
	 canvas.rotate(rotate);
	 var pas = 12;
	 for(var i = 0 ; i < mots.length ; i++){
	   var lng = (width - canvas.measureText(mots[i]).width)/2;
	   canvas.strokeText(mots[i],lng,i*pas);
	 }
	 
	 canvas.font="6pt Times news roman";
	 canvas.restore();
  }
  /* Fournit des methodes de dessins */
  var DrawerHelper = {
	drawImage:function(canvas,img,x,y,width,height,rotate){
	   canvas.save();
	   canvas.translate(x,y);
	   canvas.rotate(rotate);
	   canvas.drawImage(img,0,0,width,height);
	   canvas.restore();
	},
	writeText:function(text,x,y,rotate,canvas,size,specificWidth){
	   var width = specificWidth ||largeur;
	   canvas.font=((size!=null)?size:"7") + "pt Times news roman";
	   // Mesure la longueur du mot
	   var mots = [text];
	   if(canvas.measureText(text).width > width-5){
		 // On split les mots intelligement (on regroupe)
		 var splitMots = text.split(" ");
		 var pos = 0;
		 for(var i = 0 ; i < splitMots.length ; i++){
		    if(pos > 0 && (canvas.measureText(mots[pos-1]).width + canvas.measureText(splitMots[i]).width) < width - 5){
			  // on concatene
			  mots[pos-1] = mots[pos-1] + " " + splitMots[i];
		    }
		    else{
			  mots[pos++] = splitMots[i];
		    }
		 }
	   }
	 canvas.save();
	 canvas.translate(x,y);
	 canvas.rotate(rotate);
	 var pas = 12;
	 for(var i = 0 ; i < mots.length ; i++){
	   var lng = (width - canvas.measureText(mots[i]).width)/2;
	   canvas.strokeText(mots[i],lng,i*pas);
	 }
	 canvas.font="6pt Times news roman";
	 canvas.restore();
	}
  }
  
  function drawImage(canvas,img,x,y,width,height,rotate){
	canvas.save();
	canvas.translate(x,y);
	canvas.rotate(rotate);
	canvas.drawImage(img,0,0,width,height);
	canvas.restore();
  }
  
  function Component(){
	this.draw = function(canvas){console.log("Not implemented");}
  }
  
  function SimpleRect(x,y,height,width,color){
	Component.apply();
	this.data = {x:x,y:y,width:width,height:height};
  
	this.draw = function(canvas){
	   canvas.fillStyle=color;
	   canvas.fillRect(this.data.x,this.data.y,this.data.width,this.data.height);
	}
  }
  
  var largeur = 65;
  var hauteur = 100;
  var total = (largeur*9)/2;
  var centre = 400;
  var bordure = 20;
  var largeurPion = (largeur-5)/3;
  
  // Represente un pion d'un joueur
  function PionJoueur(color,x,y){
	Component.apply(this);
	this.x = x;
	this.y = y;
	this.color = color;
	this.largeur = largeurPion;   // Largeur du pion
	this.draw = function(canvas){
	   canvas.fillStyle=this.color;
	   canvas.beginPath();
	   canvas.arc(this.x,this.y,this.largeur/2,0,2*Math.PI);
	   canvas.fill();
	}
  }
  
  function Des(x,y,width,value){
	this.value = value;
	this.coin = 15;
	this.width = width-2*this.coin;
	this.setValue = function(value){
	   this.value = value;
	}
	this.draw = function(canvas){
	   // Structure du des
	   canvas.strokeStyle="#000000";
	   canvas.fillStyle="#000000";
	   canvas.moveTo(x + this.coin,y);
	   canvas.lineTo(x + this.coin + this.width,y);
	   canvas.bezierCurveTo(x+ this.coin*2 + this.width,y,x+ this.coin*2 + this.width,y+this.coin,x+ this.coin*2 + this.width,y+this.coin);
	   canvas.lineTo(x+ this.coin*2 + this.width,y+ this.coin + this.width);
	   canvas.bezierCurveTo(x+ this.coin*2 + this.width,y+ this.coin*2 + this.width,x+this.width+ this.coin,y+ this.coin*2 + this.width,x+this.width+ this.coin,y+ this.coin*2 + this.width);
	   canvas.lineTo(x+ this.coin,y+ this.coin*2 + this.width);
	   canvas.bezierCurveTo(x,y+ this.coin*2 + this.width,x,y+ this.coin + this.width,x,y+ this.coin + this.width);
	   canvas.lineTo(x,y+this.coin);
	   canvas.bezierCurveTo(x,y,x+this.coin,y,x+this.coin,y);
	   canvas.stroke();
	   if(this.value == null){return;}
	   if(this.value%2 == 1){
		 this.drawPoint(canvas,x+width/2,y+width/2,width/5 );
	   }
	   if(this.value !=1){
		 this.drawPoint(canvas,x+width*0.25,y+width*0.75,width/5 );
		 this.drawPoint(canvas,x+width*0.75,y+width*0.25,width/5 );
	   }
	   if(this.value >=4){
		 this.drawPoint(canvas,x+width*0.75,y+width*0.75,width/5 );
		 this.drawPoint(canvas,x+width*0.25,y+width*0.25,width/5 );
	   }
	   if(this.value == 6){
		 this.drawPoint(canvas,x+width*0.75,y+width*0.5,width/5 );
		 this.drawPoint(canvas,x+width*0.25,y+width*0.5,width/5 );
	   }
  
	}
	// Dessine un point
	this.drawPoint = function(canvas,x,y,width){
	   canvas.beginPath();
	   canvas.arc(x,y,width/2,0,2*Math.PI);
	   canvas.fill();
	}
  }
  
  function CaseSpeciale(axe,titre){
	Case.call(this,0,axe,null,titre);
	this.titre = titre;
	this.data = {};
	this.init = function(){
		if(axe%2 == 1){ // E et 0
		    // height et width inverse
		    if(axe == 1){
			  this.data.x = centre+total;
			  this.data.y = centre + -4.5 * largeur - hauteur;
		    }
		    else{
			  this.data.x = centre - total - hauteur;
			  this.data.y = centre + 4.5 * largeur;
		    }
		}
		else{ // N et S
		    if(axe == 2){
			  this.data.y = centre+total;
			  this.data.x = centre + 4.5 * largeur;
		    }
		    else{
			  this.data.y = centre - total - hauteur;
			  this.data.x = centre - 4.5 * largeur - hauteur;
		    }
		}
		this.data.height = this.data.width = hauteur;
	  }
	this.getCenter = function(){
	   return {x:this.data.x + this.data.height / 2,y:this.data.y + this.data.height / 2};
	}
	this.draw = function(canvas){
	   canvas.strokeStyle = '#000000';
	   canvas.strokeRect(this.data.x,this.data.y,this.data.width,this.data.height);
	   writeText(this.titre,this.data.x,this.data.y +hauteur/2,0,canvas,9,this.data.width);
	}
	
  
	  this.init();
  }
  
	 
  /* Representation graphique d'une fiche */
  /* Image contient src, height et width */
  function Case(pos,axe,color,title,prix,img){
	Component.apply(this);
	this.data = {};
	this.pos = pos;
	this.axe = axe;
	this.nbMaison = 0;   // Maisons a afficher sur la propriete
	this.imgMaison = new Image();
	this.imgHotel = new Image();   
	this.init = function(){
		  this.imgMaison.src="maison.png";
		  this.imgHotel.src="hotel.png";   		
		if(axe%2 == 1){ // E et 0
		    // height et width inverse
		    this.data.height = largeur;
		    this.data.width = hauteur;
		    if(axe == 1){
			  this.data.x = centre+total;
			  this.data.y = centre + (pos-5.5) * largeur;
		    }
		    else{
			  this.data.x = centre - total - hauteur;
			  this.data.y = centre + (4.5 - pos) * largeur;
		    }
		}
		else{ // N et S
		    this.data.height = hauteur;
		    this.data.width = largeur;
		    if(axe == 2){
			  this.data.y = centre+total;
			  this.data.x = centre + (4.5 - pos) * largeur;
		    }
		    else{
			  this.data.y = centre - total - hauteur;
			  this.data.x = centre + (pos - 5.5) * largeur;
		    }
		}
	   if(img!=null){
		 var image = new Image();
		 image.src=img.src;
		 image.height=img.height;
		 image.width = img.width;
		 this.data.image = image;
	   }
	  }
	  
	/* Recupere les coordonnees du centre de la case */
	this.getCenter = function(){
	   return {x:this.data.x + this.data.width / 2,y:this.data.y + this.data.height / 2};
	}
  
	this.draw = function(canvas){
	   canvas.strokeStyle = '#000000';
	   canvas.strokeRect(this.data.x,this.data.y,this.data.width,this.data.height);
	   if(color != null){
		  canvas.fillStyle = color;
		  switch(axe){
			case 0 : canvas.fillRect(this.data.x,this.data.y+hauteur-bordure,this.data.width,bordure);break
			case 1 : canvas.fillRect(this.data.x,this.data.y,bordure,largeur);break
			case 2 : canvas.fillRect(this.data.x,this.data.y,this.data.width,bordure);break;
			case 3 : canvas.fillRect(this.data.x+hauteur-bordure,this.data.y,bordure,largeur);break
		  }
	   }
	   if(title != null){
		 var mots = [title];
			var dec = 10 + ((color!=null)?bordure:0);// Uniquement si couleur
			switch(axe){
			    case 0 : writeText(title,this.data.x+largeur,this.data.y+hauteur - dec,Math.PI,canvas);break
			    case 1 : writeText(title,this.data.x + dec,this.data.y+largeur,-Math.PI/2,canvas);break
			    case 2 : writeText(title,this.data.x,this.data.y + dec,0,canvas);break;
			    case 3 : writeText(title,this.data.x + hauteur - dec,this.data.y ,Math.PI/2,canvas);;break
  
			 }
	   }
	   if(prix != null){
		 var dec = 5
		 switch(axe){
			case 0 : writeText(prix,this.data.x+largeur,this.data.y + dec,Math.PI,canvas);break
			case 1 : writeText(prix,this.data.x + hauteur - dec,this.data.y+largeur,-Math.PI/2,canvas);break
			case 2 : writeText(prix,this.data.x,this.data.y + hauteur - dec,0,canvas);break;
			case 3 : writeText(prix,this.data.x +dec,this.data.y,Math.PI/2,canvas);break;
		  }
	   }
	   if(this.data.image != null){
		 var rotate = (Math.PI/2) * ((this.axe+2)%4);
		 var lng = (largeur - this.data.image.width)/2;
		 var dec = 10 + ((color!=null)?bordure:10) + ((title!=null)?10:0);
		  switch(axe){
			case 0 : drawImage(canvas,this.data.image,this.data.x+largeur-lng,this.data.y+hauteur-dec,this.data.image.width,this.data.image.height,rotate);break
			case 1 : drawImage(canvas,this.data.image,this.data.x+dec,this.data.y+largeur-lng,this.data.image.width,this.data.image.height,rotate);break
			case 2 : drawImage(canvas,this.data.image,this.data.x+lng,this.data.y+dec,this.data.image.width,this.data.image.height,rotate);break;
			case 3 : drawImage(canvas,this.data.image,this.data.x+hauteur-dec,this.data.y+lng,this.data.image.width,this.data.image.height,rotate);break;
		  }
	   }
	   // Cas des maisons
	   if(this.nbMaison <=4){
		 // On ecrit de droite a gauche dans le cartouche
		 canvas.fillStyle='#00FF00';
		 for(var i = 0 ; i < this.nbMaison ; i++){
		    switch(axe){
			case 0 : drawImage(canvas,this.imgMaison,this.data.x+largeur-15*(i)-3,this.data.y+hauteur-2,15,15,-Math.PI);break
			case 1 : drawImage(canvas,this.imgMaison,this.data.x+3,this.data.y+largeur-2-15*i,15,15,-Math.PI/2);break
			case 2 : drawImage(canvas,this.imgMaison,this.data.x+3+15*i,this.data.y+2,15,15,0);break;
			case 3 : drawImage(canvas,this.imgMaison,this.data.x+hauteur-3,this.data.y+2+15*i,15,15,Math.PI/2);break;
		  }
		 }
	   }
	   else{
		  // Cas de l'hotel, 5 maisons
		  var pad = (largeur-18)/2;
		switch(axe){
		 case 0 : drawImage(canvas,this.imgHotel,this.data.x+largeur-pad,this.data.y+hauteur,18,18,-Math.PI);break
		 case 1 : drawImage(canvas,this.imgHotel,this.data.x,this.data.y+largeur-pad,18,18,-Math.PI/2);break
		 case 2 : drawImage(canvas,this.imgHotel,this.data.x+pad,this.data.y,18,18,0);break;
		 case 3 : drawImage(canvas,this.imgHotel,this.data.x+hauteur,this.data.y+pad,18,18,Math.PI/2);break;
		  }
	   }
	}
	// Nombre de joueur sur la case
	this.getNbJoueurs = function(){
	  var count = 0;
	  for(var i  = 0 ; i < joueurs.length ; i++){
		  if(joueurs[i].pion.etat == this.axe && joueurs[i].pion.position == this.pos){
			  count++;
		  }
	  }
	  return count;	
	}
	// Retourne le decalage d'un pion sur la case
	/* @param inverse : decalage inverse (remise en place) */
	  this.decalagePion = function(){
		  var dec = 20 + ((color!=null)?bordure:0) + largeurPion/2;
		  var center = this.getCenter();center.x+=5;
		  var pas = {x:largeurPion,y:(this.data.height - dec)/3}
		  var nb = this.getNbJoueurs()-1;
		  if(this.axe%2==0){
			  return {x:(center.x + ((nb%3)-1)*pas.y),y:((nb < 3)?center.y-pas.x:center.y+pas.x)};
		  }
		  return {x:((nb < 3)?center.x-pas.x:center.x+pas.x),y:(center.y + ((nb%3)-1)*pas.y)};
	}
	this.init();
  
  }
	 
	 function Fiche(etat,pos,colors,nom,achat,loyer,loyer1,loyer2,loyer3,loyer4,loyerHotel,prixMaison,img){
	   this.statut = ETAT_LIBRE;
	   this.joueurPossede = null;
	   this.nom = nom;
	   this.color = colors[0];
	   this.secondColor = (colors.length == 2)?colors[1]:colors[0];
	   this.achat = achat;
	   this.hypotheque = achat/2;
	   this.loyer = new Array();
	   this.loyer[0] = loyer;
	   this.loyer[1] = loyer1;
	   this.loyer[2] = loyer2;
	   this.loyer[3] = loyer3;
	   this.loyer[4] = loyer4;
	   this.loyer[5] = loyerHotel;
	   this.loyerHotel = loyerHotel;
	   this.prixMaison = prixMaison;
	   this.fiche = $('#fiche');
	   this.nbMaison = 0;   // Nombre de maison construite sur le terrain par le proprietaire
	   this.hotel = false;  // Si un hotel est present
	   this.maisons = new Array();
	   this.constructible = true;
	   this.etat = etat;
	   this.pos = pos;
	   var current = this;
	   
	   this.case = new Case(pos,etat,this.color,this.nom,"F. " + achat,img);
	   Drawer.add(this.case);
	   
	   this.vendu = function(joueur){
		this.statut = ETAT_ACHETE;
		this.joueurPossede = joueur;
	   }
	   this.isLibre = function(){
		return this.statut == ETAT_LIBRE;
	   }
	   
	   /* Modifie le nombre de maison sur le terrain */
	   this.setNbMaison = function(nb){
		 this.nbMaison = nb;
		 this.case.nbMaison = nb;
	   }
  
	   this.action = function(){
		this.fiche.dialog('option','title',nom);
		// si on est chez soit, on affiche pas
		if(this.joueurPossede!=null && this.joueurPossede.numero == joueurCourant.numero){
		  return this.chezSoi();
		}
		if(this.joueurPossede!=null){ // on doit payer un loyer
		  return this.payerLoyer();   
		}
		
		return this.openFiche();
	   }
	   
	   this.chezSoi = function(){
		return createMessage("Vous �tes " + this.nom,this.color,"Vous �tes chez vous",changeJoueur)
	   }
	   
	   this.getLoyer = function(){
		if(this.hotel == true){
		  return this.loyerHotel;
		}
		if(this.nbMaison == 0 && this.isGroupee()){
			  return this.loyer[0]*2;
		}
		return this.loyer[this.nbMaison];
	   }
	   
	   this.payerLoyer = function(){
		return createMessage("Vous �tes " + this.nom,this.color,"Vous �tes chez " + this.joueurPossede.nom + " vous devez payez la somme de " + this.getLoyer() + " Frs",function(param){
		    param.joueurPaye.payer(param.loyer);
		    param.joueurLoyer.gagner(param.loyer);
		    changeJoueur();
		  },{loyer:this.getLoyer(),joueurPaye:joueurCourant,joueurLoyer:this.joueurPossede});
	   }
	   
	   this.noArgent = function(){
		  construireMaisons(true);
	   }
	   
	   // Ouvre la fiche d'une propri�t�
	   this.openFiche = function(){
		var buttons = this.getButtons();
		this.fiche.dialog('option','buttons',buttons);
		loadFiche(this);
		this.fiche.dialog('open');
		return buttons;
	   }
	  
		  this.getButtons = function(){
			  if(this.statut == ETAT_LIBRE){
				  if(joueurCourant.montant<this.achat){
					  return {
						  "Pas assez d'argent":function(){current.fiche.dialog('close');}
					  };
				  }
				  else{
					  return {
					  "Acheter":function(){
						  var id = joueurCourant.pion.etat + "-" + joueurCourant.pion.position;
						  joueurCourant.acheteMaison(current,id);
						  current.fiche.dialog('close');
					  },
					  "Refuser":function(){current.fiche.dialog('close');}
					  };
				  }
			  }
			  else{
				  return {"Fermer":function(){current	.fiche.dialog('close');}};
			  }
		  }
	  
	  
	   this.isGroupee = function(){
		if(this.joueurPossede == null){return false;}
		var l = this.joueurPossede.findMaisonsConstructibles();
		for(var i = 0 ; i < l.length; i++){
		  if(l[i].color == this.color){return true;}
		}
		return false;
	   }
	 }
	 
	 function FicheGare(etat,pos,color,nom,achat,loyer1,loyer2,loyer3,loyer4){
	   Fiche.call(this,etat,pos,color,nom,achat,loyer1,loyer2,loyer3,loyer4,null,null,null,{src:"train.png",width:40,height:50});
	   //this.fiche = $('#ficheCompagnie');
	   this.type = "gare";
	   this.constructible = false;
	   this.getLoyer = function(){
		if(this.joueurPossede!=null){
		  var nb = -1;
		  for(var i = 0 ; i < this.joueurPossede.maisons.length ; i++){
		    if(this.joueurPossede.maisons[i].type == "gare"){nb++;}
		  }
		  return this.loyer[nb];
		}
		return 0;
	   }
	 }
	 
	 function FicheCompagnie(etat,pos,color,nom,achat,loyer1,loyer2){
	   Fiche.call(this,etat,pos,color,nom,achat,loyer1,loyer2);
	   this.fiche = $('#ficheCompagnie');
	   this.type = "compagnie";
	   this.constructible = false;
	   
	   this.getLoyer = function(){
		var loyer = des1 + des2;
		if(this.joueurPossede!=null){
		  var nb = -1;
		  for(var i = 0 ; i < this.joueurPossede.maisons.length ; i++){
		    if(this.joueurPossede.maisons[i].type == "compagnie"){nb++;}
		  }
		  return this.loyer[nb] * loyer;
		}
		return this.loyer[0] * loyer;
	   }
	 }
	 
	 
	 
	 var VERROU = false;
	 
	 // Pour la recuperation d'argent, on passe par une version all�g�e du construireMaisons
	 
	 
	 function construireMaisons(modeBanqueroute){
	   var maisons = joueurCourant.findMaisonsConstructibles();
	   maisons.sort(function(a,b){
		  if(a.color == b.color)return 0;
		  if(a.color > b.color)return 1;
		  if(a.color < b.color)return -1;
	   });
	   $('#achatMaisons').empty();
	   var m = "<table>";
	   for(var i = 0 ; i < maisons.length ; i++){
	   
		m+= '<tr id=\"idAchatMaison-' + maisons[i].color + i + '\"><td style="font-weight:bold;color:' + maisons[i].color + '">' + maisons[i].nom;
		if(maisons[i].hotel == true){
		  m+=" : 1 hotel" + '</td><td></td>';
		}
		else{
		  var id = maisons[i].etat + "-" + maisons[i].pos;
		  m+=" : </td><td><select id=\"id_input_" + id + "\">";
		    for(var j= 0;j<=((modeBanqueroute!=null)?maisons[i].nbMaison:5);j++){m+="<option value=\""+ j + "\" " + ((maisons[i].nbMaison == j)?"selected":"") + ">" + j + "</option>"};
		    m+= " </select> maison(s) (<span id=\"montant_" + id + "\"></span> Frs)</td>";
		}
		m+= '</tr>';
	   }
	   m+="<tr><td>TOTAL</td><td><span id=\"idTotalDepenses\"></span> Frs</td></tr>";
	   m+="</table>";
	   $('#achatMaisons').append(m);
	   $('#achatMaisons').find('select[id^=id_input_]').change(function(){
		var id = this.id.replace("id_input_","");
		// Au dessus du nombre, achat, en dessous, on vend la moiti�
		var montant =0;
		if($(this).val() > fiches[id].nbMaison){
			  // on achete
			  montant = ($(this).val() - fiches[id].nbMaison) * fiches[id].prixMaison;
		}
		if($(this).val() < fiches[id].nbMaison){
			  // on vend
			  montant = ($(this).val() - fiches[id].nbMaison)*fiches[id].prixMaison/2;
		}
		$('#montant_' + id).text(montant);
		var total = 0;
		$('#achatMaisons').find('span[id^=montant_]').each(function(){if($(this).text()!="")total+=parseInt($(this).text());});
		$('#idTotalDepenses').text(total);
	   });
	   
	   $('#achatMaisons').dialog('option','buttons',{
		"Annuler":function(){$('#achatMaisons').dialog('close');},
		"Effectuer":function(){
		var equilibre = true;
		  // on verifie que c'est equilibre (pas plus de une maison d'ecart
			  var colors = new Array();
			  $('#achatMaisons').find('select[id^=id_input_]').each(function(){
				  var id = this.id.replace("id_input_","");
				  var c = fiches[id].color;
				  if(colors[c]==null){	// pas encore traitee
					  colors[c] = 1;
					  var max = -1;var min = -1;
					  $('#achatMaisons').find('tr[id*=' + c + ']').each(function(){
						  var val = $(this).find('select[id^=id_input_]').val();
						  if(max == -1 && min == -1){
							  max = val;
							  min = val;
						  }
						  else{
							  if(val > max){max = val;}
							  if(val<min){min = val;}
						  }	
					  });
					  
					  if(max-min>1){equilibre = false;}
				  }
			  });
			  
		    if(equilibre == false){
			  alert("Il faut �quilibrer la r�partition des maisons sur les couleurs");
			  return;
		    }
		  
		  $('#achatMaisons').dialog('close');
		  if(parseInt($('#idTotalDepenses').text()) > joueurCourant.montant){
		    alert("Pas possible, plus assez d'argent");
		    return;
		  }
		  
		  var currentEtat = joueurCourant.pion.etat;
		  var currentPosition = joueurCourant.pion.position;
		  var currentArgent = joueurCourant.montant - parseInt($('#idTotalDepenses').text());
		  $('#achatMaisons').find('select[id^=id_input_]').each(function(){
			  var id = this.id.replace("id_input_","");
			  // Au dessus du nombre, achat, en dessous, on vend la moiti�
			  fiches[id].setNbMaison($(this).val());
		    });
		    joueurCourant.setArgent(currentArgent);
		}
	   });
	   $('#achatMaisons').dialog('open');
	 }
	 
	 // Cree le comportement lorsque le joueur arrive sur la carte
	 function doActions(){
		  var fiche = fiches[joueurCourant.pion.etat + "-" + joueurCourant.pion.position];
		  if(fiche== null){changeJoueur();return;}
		  var buttons = fiche.action();
		  // une fois l'action cree, le joueur doit faire une action
		  joueurCourant.actionApresDes(buttons,fiche);
	 }
	 
	 
	 function changeJoueur(){
	 $('#idLancerDes').removeAttr('disabled');
	   if(des1!=des2){
		joueurCourant = joueurs[(joueurCourant.numero+1)%(joueurs.length)];
		selectJoueurCourant();
		nbDouble = 0;
	   }
	   else{
		  joueurCourant.joue(); // double, rejoue
	   }
	 }
	 
	
  
	function closeFiche(){
	    changeJoueur();
	}
	 
	  
	  function rand(){
		return Math.round((Math.random()*1000))%6+1;
	   }
	   
	   /* Lance et anime les des */
	   function lancerAnimerDes(){
		 // Fait tourner les des 8 fois
		 // On desactive le bouton pour eviter double click
		 $('#idLancerDes').attr('disabled','disabled');
		 var nb = 8;
		 var interval = setInterval(function(){
		    if(nb--<0){clearInterval(interval);return lancerDes();}
		    des1Cube.setValue(rand());
			   des2Cube.setValue(rand());
		 },100);
	   }
  
	   function lancerDes(){
		  $('#informationsCentrale').html("");
		des1 = rand();
		des2 = rand();
		console.log(des1 + " & " + des2);
		des1Cube.setValue(des1);
		   des2Cube.setValue(des2);
  
  
								  
		  if(joueurCourant.enPrison == true){
			  if(des1 == des2){
				  createMessage("Lib�r� de prison","lightblue","Vous �tes lib�r�s de prison gr�ce � un double",function(){},{});
				  joueurCourant.exitPrison();
			  }
			  else{
				  if(joueurCourant.nbDouble == 2){
					  var buttons = createMessage("Lib�r� de prison","lightblue","Vous �tes lib�r�s de prison, mais vous devez payer Frs 5.000 !",function(){
				  joueurCourant.payerParcGratuit(5000);
				joueurCourant.exitPrison();
				joueurCourant.joueDes(des1+des2);
			  },{});
			  joueurCourant.actionApresDes(buttons,null);               
			  return;
				  }
				  else{
					  joueurCourant.nbDouble++;
					  var buttons = createMessage("Tour " + joueurCourant.nbDouble,"red","Vous restez en prison, vous n'avez pas fait de double.",function(){
						  changeJoueur();},{});
				  joueurCourant.actionApresDes(buttons,null);               
					  return;					
				  }				
			  }
		  }
		  else{
			  if(des1 == des2){
				  if(nbDouble >= 2){
					  // prison
					  $('#informationsCentrale').text("3eme double, allez en PRISON");
					  joueurCourant.goPrison();
			  changeJoueur();
					  return;
				  }
				  else{
					  nbDouble++;
				  }
			  }
		  }
		joueurCourant.joueDes(des1+des2);
		 if(des1 == des2){
		    $('#informationsCentrale').html("Relancez");
		 }
		
		}
		
		var joueurs = new Array();
		var joueurCourant = null;
		var colorsJoueurs = ["#383C89","#A6193E","#C58F01","#086B3D","#B9B29B"];
		var des1Cube;
		var des2Cube;
		function init(){
		  var nb = prompt("Nombre de joueurs ?");
		  for(var i = 0 ; i < nb ; i++){
		    var id = 'joueur' + i;
		    var joueur = null;
		    if(i == 0){
				  joueur = new Joueur(i,"Joueur " + (i+1));
			  }
			  else{
				  joueur = new JoueurOrdinateur(i,"Joueur " + (i+1));
			  }
		    joueurs[i] = joueur;
		    $('#informations').append('<div id=\"' + id + '\"><div><img src="pion' + i + '.gif" style="width:15px;"/> ' 
			 + joueur.nom + ' : <span class="compte-banque"></span> Frs</div></div><hr/>');
		    //$('#plateau').append('<div style="position:absolute;top:970px;left:910px;" id="pion' + id
		    //                      + '"><img src="pion' + i + '.gif" style="width:40px;"/></div>');
		    joueur.setDiv($('#' + id));
		    joueur.setPion(colorsJoueurs[i]);
		  }
		  joueurCourant = joueurs[0];
		  selectJoueurCourant();
		
		  $('#message').dialog({autoOpen:false});
		  $('#message').prev().css("background","url()");
	   
		  // panneau de cr�ation
		  $('#achatMaisons').dialog({autoOpen:false,title:"Achat de maisons / h�tels",width:500,height:300});
  
		 // Detail fiche
		 initDetailFiche();
		 initFiches();
		 initPlateau();
		 initDes();
		}
		
		// Initialise les des
		function initDes(){
		  des1Cube = new Des(200,200,50);
		  des2Cube = new Des(260,200,50);       
		  Drawer.addRealTime(des1Cube); 	
		  Drawer.addRealTime(des2Cube);        	
		}
		
		// Initialise le plateau
		function initPlateau(){
		  Drawer.init(800,800);
		 Drawer.add(new SimpleRect(0,0,800,800,'#A7E9DB'),true);
		}
		
	   function initDetailFiche(){
		 var div = $('#fiche').clone();
		 div.attr('id','idDetailFiche').hide();
		 $('body').append(div);
	   }
  
	   var currentFiche = null;
  
	   function openDetailFiche(fiche,input){
		 if(currentFiche!=null && currentFiche.etat == fiche.etat && currentFiche.pos == fiche.pos){
		    if($('#idDetailFiche:visible').length == 0){
			  $('#idDetailFiche').slideDown();
		    }
		    else{
			  $('#idDetailFiche').slideUp();
		    }
		    return;
		 }
		 if(currentFiche!=null && (currentFiche.etat != fiche.etat || currentFiche.pos != fiche.pos)){
		    currentFiche = null;
		    $('#idDetailFiche').slideUp(300,function(){openDetailFiche(fiche,input);});
		    return;
		 }
		 $('#idDetailFiche').width(280);
		 loadDetailFiche(fiche);
		 input.after($('#idDetailFiche'));
		 $('#idDetailFiche').slideDown();
		 currentFiche = fiche;
	   }
  
	   function closeDetailFiche(){
		 $('#idDetailFiche').slideUp();
	   }
  
  
   function loadFiche(fiche){
	    loadGenericFiche(fiche,$('#fiche'),'FFFFFF');
	    fiche.fiche.prev().css("background-color",fiche.color);
  
	    return;
	   fiche.fiche.prev().css("background-color",fiche.color);
	   $('#achat','#fiche').text(fiche.achat);
	   $('#loyer0','#fiche').text((fiche.isGroupee() == true)?parseInt(fiche.loyer[0])*2:fiche.loyer[0]);
	   $('#loyer1','#fiche').text(fiche.loyer[1]);
	   $('#loyer2','#fiche').text(fiche.loyer[2]);
	   $('#loyer3','#fiche').text(fiche.loyer[3]);
	   $('#loyer4','#fiche').text(fiche.loyer[4]);
	   $('#loyer5','#fiche').text(fiche.loyerHotel);
	   $('#hypotheque','#fiche').text(fiche.achat/2);
	   $('#fiche').find("tr").removeClass("nbMaisons");
	   $('#fiche').find("div:first").removeClass("nbMaisons");
	   if(fiche.joueurPossede == null){
		return;
	   }
	   if(fiche.nbMaison > 0){
		$('#loyer0' + fiche.nbMaison,'#fiche').parent().addClass("nbMaisons");
	   }
	   else{
		if(fiche.isGroupee() == true){ // possede la serie
		   $('#fiche').find("div:first").addClass("nbMaisons");
		}
		$('#loyer0','#fiche').parent().addClass("nbMaisons");
	   }
	 }
  
  function loadDetailFiche(fiche){
	loadGenericFiche(fiche,$('#idDetailFiche'),fiche.secondColor);
  }
  
	   function loadGenericFiche(fiche,div,color){
		 $('td[name^="loyer"]',div).each(function(){
		    $(this).text(fiche.loyer[parseInt($(this).attr('name').substring(5))]);
		 });
		    $('td[name]:not([name^="loyer"]),span[name]:not([name^="loyer"])',div).each(function(){
			  $(this).html(fiche[$(this).attr('name')]);
		    });
		  $(div).css('backgroundColor',color);
		  $('#loyer0',div).text((fiche.isGroupee() == true)?parseInt(fiche.loyer[0])*2:fiche.loyer[0]);
  
		  $('tr',div).removeClass("nbMaisons");
		  $('infos-group',div).removeClass("nbMaisons");
		  $('#loyer' + fiche.nbMaison,div).parent().addClass("nbMaisons");
		  if(fiche.nbMaison == 0 && fiche.isGroupee() == true){ // possede la serie
			  $('.infos-group',div).addClass("nbMaisons");
		  }
	   }
  
	 function initFiches(){
	    $('#fiche').dialog({
		    autoOpen:false,
		    title:"Fiche",
		    width:280,
		    height:400,
		    modal:true,
		    resizable:false,
		    close:function(){closeFiche();}
		  });
		  $('#fiche').prev().css("background","url()");
  
		   $('#ficheCompagnie').dialog({
		    autoOpen:false,
		    title:"Fiche",
		    width:280,
		    height:350,
		    modal:true,
		    resizable:false,
		    close:function(){closeFiche();}
		  });
		  $('#ficheCompagnie').prev().css("background","url()");
	 }
  
		function selectJoueurCourant(){
		  selectJoueur(joueurCourant);
		}
		
		function selectJoueur(joueur){
		$('#informations > div > div').removeClass('joueurCourant');
		joueur.div.find('div:first').addClass('joueurCourant');
		if(!joueur.enPrison){
		    joueur.nbDouble = 0;
		}
		joueur.joue();
		}
	 
	 
