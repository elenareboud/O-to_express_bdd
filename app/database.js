import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client();
client.connect();

export default client;

//je m'assure de lancer la config de dotenv en 1er, 
//pg saura à quelle bdd se connecter (info de connexion sera dans .env)
//on crée un objet qui disposera de la méthode connect qu'on execute