class Diccionario{


    static async comprobarPalabra(){
        const url = `https://rae-api.com/api/words/amar`;

        const response = await fetch(url);

        if (!response.ok) {
            console.log("oh no");
        }
        else {
            console.log("exito");
        }
    }

    
}