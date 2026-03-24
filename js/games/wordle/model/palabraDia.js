class PalabraDia {
    static seleccionarPalabra(modo = this.modoActual) {
        const palabrasModo = this.obtenerPalabrasModo(modo);
        const indice = Math.floor(Math.random() * palabrasModo.length);
        this.modoActual = modo;
        this.entradaActual = palabrasModo[indice];
        console.log("Palabra del dia seleccionada:", this.entradaActual.palabra, `(${modo})`);
        return this.entradaActual;
    }

    static obtenerEntradaDelDia(modo = this.modoActual) {
        if (!this.entradaActual || this.modoActual !== modo) {
            this.seleccionarPalabra(modo);
        }

        return this.entradaActual;
    }

    static getPalabraDelDia(modo = this.modoActual) {
        return this.obtenerEntradaDelDia(modo).palabra;
    }

    static getDefinicionDelDia(modo = this.modoActual) {
        return this.obtenerEntradaDelDia(modo).definicion;
    }

    static getModoActual() {
        return this.modoActual;
    }

    static getModosDisponibles() {
        return this.modos;
    }

    static cambiarModo(modo) {
        if (!this.modos[modo]) {
            return false;
        }

        const haCambiado = this.modoActual !== modo;
        this.modoActual = modo;
        this.entradaActual = null;
        return haCambiado;
    }

    static reiniciarPalabra() {
        this.entradaActual = null;
    }

    static obtenerPalabrasModo(modo) {
        const configModo = this.modos[modo];
        return configModo ? configModo.palabras : this.modos.normal.palabras;
    }
}

PalabraDia.entradaActual = null;
PalabraDia.modoActual = "normal";
PalabraDia.modos = {
    normal: {
        id: "normal",
        etiqueta: "Normal",
        emoji: "&#x1F48C;",
        descripcion: "Adivina la palabra del dia antes de quedarte sin intentos.",
        palabras: [
            { palabra: "CASA", definicion: "Edificio o lugar donde vive una persona o familia." },
            { palabra: "NUBE", definicion: "Masa visible de gotas de agua suspendidas en la atmosfera." },
            { palabra: "RIO", definicion: "Corriente natural de agua que desemboca en otra, en un lago o en el mar." },
            { palabra: "PAPEL", definicion: "Lamina fina hecha con pasta de fibras vegetales." },
            { palabra: "SILLA", definicion: "Asiento individual con respaldo." },
            { palabra: "CAMINO", definicion: "Via o senda por la que se transita." },
            { palabra: "VENTANA", definicion: "Abertura en una pared que deja pasar la luz y el aire." },
            { palabra: "BOSQUE", definicion: "Terreno poblado de arboles y vegetacion." },
            { palabra: "RELOJ", definicion: "Instrumento que sirve para medir el tiempo." },
            { palabra: "PUERTA", definicion: "Abertura de entrada o salida que se cierra con una hoja." },
            { palabra: "ARENA", definicion: "Conjunto de granos finos procedentes de rocas." },
            { palabra: "FUEGO", definicion: "Fenomeno de combustion que produce calor y luz." },
            { palabra: "NARANJA", definicion: "Fruto del naranjo de color anaranjado." },
            { palabra: "PERRO", definicion: "Animal domestico muy comun como companero." },
            { palabra: "GATO", definicion: "Mamifero felino domestico." },
            { palabra: "MESA", definicion: "Mueble compuesto por una tabla horizontal con patas." },
            { palabra: "SOMBRERO", definicion: "Prenda que se lleva en la cabeza." },
            { palabra: "MONTANA", definicion: "Elevacion natural grande del terreno." },
            { palabra: "ZAPATO", definicion: "Calzado que cubre el pie." },
            { palabra: "CUADRO", definicion: "Obra pintada o enmarcada." },
            { palabra: "ESPEJO", definicion: "Superficie que refleja las imagenes." },
            { palabra: "TIJERA", definicion: "Instrumento para cortar formado por dos hojas." },
            { palabra: "CUERDA", definicion: "Conjunto de hilos o fibras trenzadas." },
            { palabra: "BARCO", definicion: "Embarcacion para navegar." },
            { palabra: "LLAVE", definicion: "Instrumento para abrir o cerrar cerraduras." },
            { palabra: "PLUMA", definicion: "Pieza que cubre el cuerpo de las aves." },
            { palabra: "JARDIN", definicion: "Terreno donde se cultivan plantas ornamentales." },
            { palabra: "TREN", definicion: "Medio de transporte que circula sobre railes." },
            { palabra: "PIEDRA", definicion: "Trozo de roca dura." },
            { palabra: "HARINA", definicion: "Polvo obtenido al moler cereales u otras semillas." },
            { palabra: "CUCHARA", definicion: "Utensilio para comer o servir alimentos." },
            { palabra: "TEJADO", definicion: "Parte superior que cubre un edificio." },
            { palabra: "HORMIGA", definicion: "Insecto social de pequeno tamano." },
            { palabra: "BOTELLA", definicion: "Recipiente de cuello estrecho para liquidos." },
            { palabra: "LINTERNA", definicion: "Aparato portatil que emite luz." },
            { palabra: "PELOTA", definicion: "Bola usada en juegos y deportes." },
            { palabra: "COLINA", definicion: "Elevacion suave del terreno." },
            { palabra: "CHARCO", definicion: "Acumulacion pequena de agua en el suelo." },
            { palabra: "MANTEL", definicion: "Tela que se pone sobre la mesa." },
            { palabra: "CAJON", definicion: "Compartimento deslizante de un mueble." },
            { palabra: "GRILLO", definicion: "Insecto conocido por su sonido nocturno." },
            { palabra: "CAMISA", definicion: "Prenda de vestir que cubre el torso." },
            { palabra: "BUFANDA", definicion: "Prenda larga que abriga el cuello." },
            { palabra: "PINTURA", definicion: "Material o arte de pintar superficies." },
            { palabra: "ALMOHADA", definicion: "Cojin que sirve de apoyo para la cabeza." },
            { palabra: "PALMERA", definicion: "Arbol de tronco alto y hojas grandes." },
            { palabra: "CASCADA", definicion: "Caida natural de agua desde cierta altura." },
            { palabra: "CUADERNO", definicion: "Conjunto de hojas encuadernadas para escribir." },
            { palabra: "BURBUJA", definicion: "Porcion de gas rodeada por una pelicula liquida." },
            { palabra: "MARTILLO", definicion: "Herramienta para golpear o clavar." },
            { palabra: "ESCALERA", definicion: "Conjunto de escalones para subir o bajar." },
            { palabra: "TRUENO", definicion: "Ruido fuerte que acompana al rayo." },
            { palabra: "FAROL", definicion: "Linterna o lampara para alumbrar." },
            { palabra: "MALETA", definicion: "Equipaje de mano para transportar objetos." },
            { palabra: "CARRETA", definicion: "Vehiculo pequeno de carga tirado por animales." },
            { palabra: "MANZANA", definicion: "Fruta del manzano." },
            { palabra: "HELADO", definicion: "Postre frio elaborado con leche, agua o frutas." },
            { palabra: "NIDO", definicion: "Refugio que construyen algunas aves para criar." },
            { palabra: "RATON", definicion: "Mamifero roedor de pequeno tamano." },
            { palabra: "CASTILLO", definicion: "Fortificacion o residencia senorial antigua." },
            { palabra: "ABISMO", definicion: "Profundidad grande y peligrosa." },
            { palabra: "MADERA", definicion: "Material obtenido del tronco de los arboles." },
            { palabra: "GUITARRA", definicion: "Instrumento musical de cuerda." },
            { palabra: "SOMBRA", definicion: "Oscuridad causada por un cuerpo que tapa la luz." },
            { palabra: "CANDADO", definicion: "Cerradura portatil que se abre con llave o combinacion." },
            { palabra: "LAGUNA", definicion: "Deposito natural de agua, menor que un lago." },
            { palabra: "PAJARO", definicion: "Ave de pequeno tamano." },
            { palabra: "SEMILLA", definicion: "Parte de una planta de la que nace otra nueva." },
            { palabra: "CEREZA", definicion: "Fruto rojo y pequeno del cerezo." },
            { palabra: "MOLINILLO", definicion: "Objeto con aspas que gira con el viento o el movimiento." },
            { palabra: "ZAPATERIA", definicion: "Tienda donde se venden zapatos." },
            { palabra: "ALFOMBRA", definicion: "Tejido grueso que cubre el suelo." },
            { palabra: "CINTURON", definicion: "Tira que se ajusta a la cintura." },
            { palabra: "FOGATA", definicion: "Monton de lena encendida al aire libre." },
            { palabra: "PALACIO", definicion: "Edificio grande y lujoso." },
            { palabra: "BIGOTE", definicion: "Vello que crece sobre el labio superior." },
            { palabra: "ESTANQUE", definicion: "Deposito de agua, natural o artificial." },
            { palabra: "MOCHILA", definicion: "Bolsa que se lleva a la espalda." },
            { palabra: "MEDALLA", definicion: "Pieza metalica que se entrega como premio o recuerdo." },
            { palabra: "CANGREJO", definicion: "Crustaceo con caparazon y pinzas." },
            { palabra: "TOMATE", definicion: "Fruto rojo muy usado en cocina." },
            { palabra: "AVION", definicion: "Aeronave propulsada por motor." },
            { palabra: "CAMPANA", definicion: "Instrumento metalico que suena al ser golpeado." },
            { palabra: "VIOLIN", definicion: "Instrumento musical de cuerda frotada." },
            { palabra: "PIRATA", definicion: "Persona que roba en el mar." },
            { palabra: "CARACOL", definicion: "Molusco con concha en espiral." },
            { palabra: "PANAL", definicion: "Estructura de cera construida por las abejas." },
            { palabra: "ESPUMA", definicion: "Conjunto de burbujas en la superficie de un liquido." },
            { palabra: "LADRILLO", definicion: "Bloque de barro cocido usado en construccion." },
            { palabra: "CAMELLO", definicion: "Mamifero adaptado a zonas deserticas." },
            { palabra: "CABANA", definicion: "Construccion rustica y pequena." },
            { palabra: "BASTON", definicion: "Palo que sirve de apoyo al caminar." },
            { palabra: "VOLCAN", definicion: "Abertura terrestre por la que sale magma." },
            { palabra: "COLLAR", definicion: "Adorno que se lleva alrededor del cuello." },
            { palabra: "CARPETA", definicion: "Objeto para guardar y organizar papeles." },
            { palabra: "ABANICO", definicion: "Instrumento manual para hacer aire." },
            { palabra: "COJIN", definicion: "Almohadon pequeno para apoyar el cuerpo." },
            { palabra: "GLOBO", definicion: "Objeto flexible que se infla con aire o gas." },
            { palabra: "PARQUE", definicion: "Espacio verde publico para ocio." },
            { palabra: "CERRO", definicion: "Elevacion aislada y de poca altura." },
            { palabra: "GAFAS", definicion: "Objeto con lentes para corregir o proteger la vista." },
            { palabra: "CAJA", definicion: "Recipiente con tapa para guardar cosas." },
            { palabra: "FARO", definicion: "Torre con luz para orientar a los navegantes." },
            { palabra: "DEDAL", definicion: "Pieza pequena que protege el dedo al coser." },
            { palabra: "RUEDA", definicion: "Pieza circular que gira sobre un eje." },
            { palabra: "BUZON", definicion: "Caja donde se depositan cartas." },
            { palabra: "ANCLA", definicion: "Instrumento que sirve para fijar una embarcacion." },
            { palabra: "PEPINO", definicion: "Hortaliza alargada de color verde." },
            { palabra: "TRONCO", definicion: "Tallo principal de un arbol." },
            { palabra: "CACTUS", definicion: "Planta adaptada a climas secos." },
            { palabra: "ESPONJA", definicion: "Material poroso que absorbe liquidos." },
            { palabra: "MORRAL", definicion: "Bolsa o saco que se lleva colgado." },
            { palabra: "PINCEL", definicion: "Instrumento con cerdas para pintar." },
            { palabra: "CANASTA", definicion: "Recipiente tejido para transportar cosas." },
            { palabra: "GRANJA", definicion: "Lugar donde se crían animales o se cultiva." },
            { palabra: "SARTEN", definicion: "Utensilio de cocina para freir." },
            { palabra: "PERCHA", definicion: "Objeto para colgar ropa." },
            { palabra: "HIELO", definicion: "Agua en estado solido." },
            { palabra: "NIEBLA", definicion: "Conjunto de gotas de agua muy finas en el aire." },
            { palabra: "CORBATA", definicion: "Prenda que se ata al cuello sobre la camisa." },
            { palabra: "PALOMA", definicion: "Ave domestica o silvestre muy comun." },
            { palabra: "REMOLINO", definicion: "Movimiento giratorio rapido del aire o del agua." },
            { palabra: "COBRE", definicion: "Metal rojizo buen conductor." },
            { palabra: "MAPA", definicion: "Representacion geografica de un territorio." },
            { palabra: "CANELA", definicion: "Especia aromatica procedente de una corteza." },
            { palabra: "PUPITRE", definicion: "Mesa escolar con asiento o soporte para escribir." },
            { palabra: "LAGARTO", definicion: "Reptil de cuerpo alargado y patas cortas." },
            { palabra: "TROMPETA", definicion: "Instrumento musical de viento metal." },
            { palabra: "CENTELLA", definicion: "Chispa o destello rapido." },
            { palabra: "BODEGA", definicion: "Lugar donde se guarda vino o mercancias." },
            { palabra: "TAPIZ", definicion: "Tejido decorativo que se cuelga o se extiende." },
            { palabra: "BALANZA", definicion: "Instrumento para pesar o comparar masas." },
            { palabra: "JINETE", definicion: "Persona que monta a caballo." },
            { palabra: "COLMILLO", definicion: "Diente largo y puntiagudo." },
            { palabra: "TINTERO", definicion: "Recipiente para guardar tinta." },
            { palabra: "PASTEL", definicion: "Dulce horneado o preparado de reposteria." },
            { palabra: "PUNAL", definicion: "Arma blanca corta y puntiaguda." },
            { palabra: "MURALLA", definicion: "Muro alto y robusto que rodea un lugar." },
            { palabra: "ALFILER", definicion: "Pieza metalica fina con punta." },
            { palabra: "CANARIO", definicion: "Ave pequena conocida por su canto." },
            { palabra: "ESTUFA", definicion: "Aparato que produce calor." },
            { palabra: "PANDERO", definicion: "Instrumento musical de percusion." },
            { palabra: "ORILLA", definicion: "Borde de un rio, lago o mar." },
            { palabra: "MIMBRE", definicion: "Varilla flexible usada en cesteria." },
            { palabra: "COFRE", definicion: "Caja resistente para guardar objetos valiosos." },
            { palabra: "PASILLO", definicion: "Espacio alargado que comunica habitaciones." },
            { palabra: "CUENCO", definicion: "Recipiente hondo y redondeado." },
            { palabra: "RAMA", definicion: "Parte del arbol que nace del tronco." },
            { palabra: "HOGUERA", definicion: "Fuego encendido al aire libre con lena." },
            { palabra: "TESORO", definicion: "Conjunto de objetos valiosos." },
            { palabra: "BARRIL", definicion: "Recipiente grande de madera o metal." },
            { palabra: "ZORRO", definicion: "Mamifero carnivoro de hocico fino." },
            { palabra: "CISNE", definicion: "Ave acuatica de cuello largo." },
            { palabra: "COMETA", definicion: "Astro o juguete ligero que vuela con el viento." },
            { palabra: "SELLO", definicion: "Marca o pieza para estampar." },
            { palabra: "TABURETE", definicion: "Asiento sin respaldo, generalmente alto." },
            { palabra: "GUANTE", definicion: "Prenda que cubre la mano." },
            { palabra: "MOLINO", definicion: "Maquina para moler o estructura movida por viento o agua." },
            { palabra: "CUBO", definicion: "Recipiente o solido con seis caras cuadradas." },
            { palabra: "SENDERO", definicion: "Camino estrecho." },
            { palabra: "HIEDRA", definicion: "Planta trepadora de hojas perennes." },
            { palabra: "RUBI", definicion: "Piedra preciosa de color rojo." },
            { palabra: "BRONCE", definicion: "Aleacion de cobre y estano." }
        ]
    },
    quimica: {
        id: "quimica",
        etiqueta: "Quimica",
        emoji: "&#x1F9EA;",
        descripcion: "Adivina terminos relacionados con la quimica y sus materiales.",
        palabras: [
            { palabra: "ATOMO", definicion: "Unidad basica de la materia formada por protones, neutrones y electrones." },
            { palabra: "ION", definicion: "Atomo o molecula con carga electrica neta." },
            { palabra: "MOLAR", definicion: "Relacionado con la concentracion expresada en moles por litro." },
            { palabra: "SOLUTO", definicion: "Sustancia que se disuelve en un disolvente." },
            { palabra: "MEZCLA", definicion: "Combinacion fisica de dos o mas sustancias." },
            { palabra: "ACIDO", definicion: "Sustancia que dona protones o aumenta la concentracion de H+ en disolucion." },
            { palabra: "BASE", definicion: "Sustancia que acepta protones o aporta iones OH- en disolucion." },
            { palabra: "PH", definicion: "Escala que mide la acidez o basicidad de una disolucion." },
            { palabra: "ENLACE", definicion: "Fuerza que mantiene unidos atomos o iones." },
            { palabra: "CATION", definicion: "Ion con carga positiva." },
            { palabra: "ANION", definicion: "Ion con carga negativa." },
            { palabra: "REDOX", definicion: "Proceso de oxidacion y reduccion con transferencia de electrones." },
            { palabra: "OXIDO", definicion: "Compuesto formado por oxigeno y otro elemento." },
            { palabra: "SAL", definicion: "Compuesto ionico resultado habitual de una reaccion entre acido y base." },
            { palabra: "MOL", definicion: "Unidad del SI para cantidad de sustancia." },
            { palabra: "REACTOR", definicion: "Recipiente o sistema donde se lleva a cabo una reaccion quimica." },
            { palabra: "CATODO", definicion: "Electrodo donde ocurre la reduccion." },
            { palabra: "ANODO", definicion: "Electrodo donde ocurre la oxidacion." },
            { palabra: "VALENCIA", definicion: "Capacidad de combinacion de un elemento." },
            { palabra: "POLIMERO", definicion: "Macromolecula formada por unidades repetidas." },
            { palabra: "LIGANDO", definicion: "Ion o molecula que se une a un atomo central en un complejo." },
            { palabra: "TITULACION", definicion: "Tecnica analitica para determinar concentraciones." },
            { palabra: "DISOLVENTE", definicion: "Sustancia que disuelve al soluto." },
            { palabra: "MOLECULA", definicion: "Conjunto de atomos enlazados que constituye la unidad minima de una sustancia." },
            { palabra: "ISOTOPO", definicion: "Atomo del mismo elemento con distinto numero de neutrones." },
            { palabra: "CATALISIS", definicion: "Aceleracion de una reaccion mediante un catalizador." },
            { palabra: "CATALIZADOR", definicion: "Sustancia que modifica la velocidad de reaccion sin consumirse." },
            { palabra: "PRECIPITADO", definicion: "Solido que se forma y separa en una disolucion." },
            { palabra: "ALQUENO", definicion: "Hidrocarburo con al menos un doble enlace carbono-carbono." },
            { palabra: "ALCANO", definicion: "Hidrocarburo saturado con enlaces simples." },
            { palabra: "CETONA", definicion: "Compuesto organico con grupo carbonilo unido a dos carbonos." },
            { palabra: "AMIDA", definicion: "Compuesto organico derivado de un acido carboxilico y amoniaco o aminas." },
            { palabra: "ESTER", definicion: "Compuesto organico derivado de un acido y un alcohol." },
            { palabra: "AMINA", definicion: "Compuesto organico derivado del amoniaco." },
            { palabra: "BORATO", definicion: "Sal o ester del acido borico." },
            { palabra: "NITRATO", definicion: "Anion o sal derivada del acido nitrico." },
            { palabra: "SULFATO", definicion: "Anion o sal derivada del acido sulfurico." },
            { palabra: "FOSFATO", definicion: "Anion o sal derivada del acido fosforico." },
            { palabra: "CROMATO", definicion: "Anion que contiene cromo y oxigeno." },
            { palabra: "BURETA", definicion: "Tubo graduado usado para dosificar volumenes con precision." }
        ]
    }
};
