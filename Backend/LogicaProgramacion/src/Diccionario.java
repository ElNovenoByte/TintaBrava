import java.util.*;

public class Diccionario {

    public static void main(String[] args){


        HashMap<String, String> diccionario = new HashMap<>();

        diccionario.put("Manzana", "Apple");
        diccionario.put("Casa", "House");
        diccionario.put("Perro", "Dog");
        diccionario.put("Gato", "Cat");
        diccionario.put("Agua", "Water");
        diccionario.put("Fuego", "Fire");
        diccionario.put("Tierra", "Earth");
        diccionario.put("Cielo", "Sky");
        diccionario.put("Luna", "Moon");
        diccionario.put("Sol", "Sun");
        diccionario.put("Libro", "Book");
        diccionario.put("Mesa", "Table");
        diccionario.put("Silla", "Chair");
        diccionario.put("Puerta", "Door");
        diccionario.put("Ventana", "Window");
        diccionario.put("Árbol", "Tree");
        diccionario.put("Flor", "Flower");
        diccionario.put("Río", "River");
        diccionario.put("Montaña", "Mountain");
        diccionario.put("Camino", "Road");

        System.out.println(diccionario.get("Flor"));

        List<String> claves = new ArrayList<>(diccionario.keySet());

        // Mezclar aleatoriamente
        Collections.shuffle(claves);

        // Se crea una lista para guardar las respuestas del usuario
        List<String> valores = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);

        for( int i =0; i < 5; i ++ ){
            System.out.println("Traduce la siguiente palabra al ingles: " + claves.get(i));
            String respuesta = scanner.nextLine();
            valores.add(respuesta);
        }
        System.out.println(valores);


    }
}
