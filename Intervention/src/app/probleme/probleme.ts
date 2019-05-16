export interface IProbleme {
    id: number,
    prenom: string,
    nom: string,
    noTypeProbleme: string,
    notification: string,
    courriel?: string,
    courrielConfirmation?: string,
    telephone?: string,
    nounite?: string,
    descriptionProbleme?: string,
    dateProbleme: Date
}



