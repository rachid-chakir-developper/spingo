export class Employe {
    public data: {
        id: number,
        prenom: string,
        nom: string,
        username: string,
        email: string,
        profil: string,
        actif: boolean,
        agence: {
            id: number,
            nom: string
        }
    };
    public token: string;
}
