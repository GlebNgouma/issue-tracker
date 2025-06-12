//Le midllewre est une fonction qui s'execute à chaque requete et qui nous donne la possibilité de redirigé l'utilisateur vers la page de connexion.
//S'ils tentent d'accede a un itineraire protege sans se connecter au prealable.
export { default } from "next-auth/middleware";

//cette fonction middlewre va s'appliquer sur les routes suivantes:
export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"], //si j'essaie d'ajouter un nouveau probleme je vais etre rediriger vers la page de conexion parceque je ne suis pas connecté
};

//Nous avons pas de page pour supprimer un issue. ce que nous devons faire c'est masquer le bouton de suppression, donc dans la page de details ou se trouve le
//bouton nous allons obtenir la session
