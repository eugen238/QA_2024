// PS D:\Универ\6 семестр\AQA\Software-Testing\lab6\Java.Collections> javac Accessory.java Bouquet.java FileDataReader.java Flower.java FlowerShopApp.java Rose.java Tulip.java
// PS D:\Универ\6 семестр\AQA\Software-Testing\lab6\Java.Collections> java FlowerShopApp

import java.util.List;
import java.io.IOException;

public class FlowerShopApp {
    public static void main(String[] args) {
        Bouquet bouquet = new Bouquet();
        bouquet.addFlower(new Rose(100, 1, 40));
        bouquet.addFlower(new Tulip(70, 2, 30));
        bouquet.addAccessory(new Accessory("Лента", 20));

        System.out.println("Стоимость букета: " + bouquet.getTotalCost());

        bouquet.sortFlowersByFreshness();
        System.out.println("Цветы в букете после сортировки по свежести:");
        for (Flower flower : bouquet.getFlowers()) {
            System.out.println(flower);
        }

        System.out.println("Цветы с длиной стебля от 20 до 35 см:");
        List<Flower> flowersInRange = bouquet.findFlowersByStemLength(20, 35);
        for (Flower flower : flowersInRange) {
            System.out.println(flower);
        }

        System.out.println();
        System.out.println();

        // read from file

        try {
            Bouquet bouquet2 = new Bouquet();
            bouquet2.getFlowers().addAll(FileDataReader.readFlowersFromFile("flowers.txt"));
            bouquet2.getAccessories().addAll(FileDataReader.readAccessoriesFromFile("accessories.txt"));

            System.out.println("Стоимость букета: " + bouquet2.getTotalCost());

            bouquet2.sortFlowersByFreshness();
            System.out.println("Цветы в букете после сортировки по свежести:");
            for (Flower flower : bouquet2.getFlowers()) {
                System.out.println(flower);
            }

            System.out.println("Цветы с длиной стебля от 20 до 35 см:");
            List<Flower> flowersInRange2 = bouquet2.findFlowersByStemLength(20, 35);
            for (Flower flower : flowersInRange2) {
                System.out.println(flower);
            }

        } catch (IOException e) {
            System.err.println("Ошибка при чтении из файла: " + e.getMessage());
        }
    }
}
