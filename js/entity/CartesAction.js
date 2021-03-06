/* Cartes actions (chance ou caisse de communaute) */

function CarteAction(type,action){
	this.type = type;
	this.action = function(joueur){
		alert("Not implemented");
	}

}

/* Action de déplacement vers une case */
/* @param direct : si renseigné a vrai, le pion est deplacé directement vers la case, sans passer par la case depart */
function GotoCarte(axe, pos, direct) {
	CarteAction.call(this,"goto");
	this.action = function (joueur) {
		if (direct) {
			joueur.pion.goDirectToCell(axe, pos, doActions);
		} else {
			joueur.pion.goto(axe, pos, doActions);
		}
	}
}

/* Carte sortie de prison */
function PrisonCarte() {
	CarteAction.call(this,"prison");
	this.joueurPossede = null;
	this.action = function (joueur) {
		joueur.cartesSortiePrison.push(this);
		this.joueurPossede = joueur;
		GestionJoueur.change();
	}
	this.isLibre = function () {
		return this.joueurPossede == null;
	}
}

/* Action de déplacement d'un certain nombre de case */
function MoveNbCarte(nb) {
	CarteAction.call(this,"move");
	this.action = function (joueur) {
		var pos = joueur.pion.deplaceValeursDes(nb); // On ajoute 40 pour les cases négatives
		joueur.pion.goDirectToCell(pos.axe, pos.pos, doActions);
	}
}

/* Action de gain d'argent pour une carte */
function PayerCarte(montant,parc) {
	CarteAction.call(this,"taxe");
	this.parc = parc;
	this.montant = montant;
	this.action = function (joueur) {
		joueur.payerParcGratuit(this.parc,this.montant, function () {
			GestionJoueur.change();
		});
	}
}

/* Action de perte d'argent pour une carte */
function GagnerCarte(montant) {
	CarteAction.call(this,"prime");
	this.montant = montant;
	this.action = function (joueur) {
		joueur.gagner(this.montant);
		GestionJoueur.change();
	}
}

var CarteActionFactory = {
	get:function(data) {
		switch (data.type) {
		/* Amande a payer */
		case "taxe":
			return new PayerCarte(data.montant,InitMonopoly.plateau.parcGratuit);
		/* Argent a toucher */
		case "prime":
			return new GagnerCarte(data.montant);
		/* Endroit ou aller */
		case "goto":
			return new GotoCarte(data.axe, data.pos, data.direct);
		/* Deplacement a effectuer */
		case "move":
			return new MoveNbCarte(data.nb);
		/* Carte prison */
		case "prison":
			return new PrisonCarte();
		}
		throw "Type inconnu";
	}
}
	

