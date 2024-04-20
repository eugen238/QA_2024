import java.util.Random;

public class RandomNumbers {
    public static void main(String[] args) {
        // Задаем количество случайных чисел для генерации
        int count = 5; // Замените на нужное количество

        // Создаем объект Random для генерации случайных чисел
        Random random = new Random();

        // Выводим заданное количество случайных чисел с переходом на новую строку
        System.out.println("Случайные числа с переходом на новую строку:");
        for (int i = 0; i < count; i++) {
            int randomNumber = random.nextInt(100); // Генерируем случайное число от 0 до 99
            System.out.println(randomNumber);
        }

        // Выводим заданное количество случайных чисел без перехода на новую строку
        System.out.println("Случайные числа без перехода на новую строку:");
        for (int i = 0; i < count; i++) {
            int randomNumber = random.nextInt(100); // Генерируем случайное число от 0 до 99
            System.out.print(randomNumber + " ");
        }
    }
}
