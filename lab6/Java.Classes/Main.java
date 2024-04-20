import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Создаем массив объектов Car
        CarArray carArray = new CarArray();

        // Добавляем несколько автомобилей в массив
        carArray.addCar(new Car(1, "Toyota", "Camry", 2015, "Синий", 15000, "A123BC"));
        carArray.addCar(new Car(2, "Honda", "Accord", 2018, "Черный", 18000, "X456YZ"));
        carArray.addCar(new Car(3, "Toyota", "Corolla", 2010, "Красный", 10000, "P789QR"));

        // a) Список автомобилей заданной марки
        System.out.println("Список автомобилей марки Toyota:");
        List<Car> toyotaCars = carArray.getCarsByBrand("Toyota");
        for (Car car : toyotaCars) {
            System.out.println(car);
        }

        // b) Список автомобилей заданной модели, которые эксплуатируются больше n лет
        System.out.println("\nСписок автомобилей модели Camry, которые эксплуатируются больше 5 лет:");
        List<Car> oldCamrys = carArray.getCarsByModelAndYears("Camry", 5);
        for (Car car : oldCamrys) {
            System.out.println(car);
        }

        // c) Список автомобилей заданного года выпуска, цена которых больше указанной
        System.out.println("\nСписок автомобилей 2015 года выпуска, цена которых больше 12000:");
        List<Car> expensive2015Cars = carArray.getCarsByYearAndPrice(2015, 12000);
        for (Car car : expensive2015Cars) {
            System.out.println(car);
        }
    }
}
