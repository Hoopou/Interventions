import {ICategorie} from "./probleme";
import {InMemoryDbService} from "angular-in-memory-web-api";

export  class CategorieProbleme implements InMemoryDbService{
    createDb() {
        let categorie: ICategorie[] = [
            {
                'id': 1 ,
                'problemeDescription': 'Problème avec la souris'
            },
            {
                'id': 2,
                'problemeDescription': 'Problème de clavier'
            },
            {
                'id': 3,
                'problemeDescription': 'Problème d\'accès Internet'
            },
            {
                'id': 4,
                'problemeDescription': 'Problème avec un logiciel'
            },
            {
                'id': 5,
                'problemeDescription': 'Problème d\'imprimante'
            },
            {
                'id': 6,
                'problemeDescription': 'Carte graphique'
            },
            {
                'id': 7,
                'problemeDescription': 'Carte mère'
            },
            {
                'id': 8,
                'problemeDescription': 'Autre'
            }
        ];       
        //return { probleme, typesprobleme};
        return {categorie};        
    }
}