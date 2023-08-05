# SocialMediaApp

* Hacer "docker compose up" del docker-compose.yml en back para correr base de datos mongo
* Dentro de back tambien en una terminal correr "pnpm install" y "pnpm run start" (instalar pnpm si es necesario)
* dentro de front correr en una terminal "pnpm install" y "ng serve"
* las Urls son:
* localhost:3000/auth/login {
    "email": "stiven2@gmail.com",
    "password": "pass2" 
}
* localhost:3000/auth/register {
    "user": {
        "name": "stiven3",
        "email": "stiven3@gmail.com",
        "password": "pass3" 
    }
}
* localhost:3000/posts?date=2023-08-05
* localhost:3000/posts?date=2023-08-05&keyword=algoTItulo
* localhost:3000/posts?user=stiven2@gmail.com
* localhost:3000/posts
* TODO:
* Mejorar interfaz
* crear interfaz para crear publicacion, ver mis publicaciones y ver todas las publicaciones y simplemente llamar a la api(La cual ya tiene implementados estos servicios)
* boton de cerrar sesion
