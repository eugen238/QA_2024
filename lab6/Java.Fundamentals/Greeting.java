import java.util.Scanner;

public class Greeting {
    public static void main(String[] args) {
        // Создаем объект Scanner для считывания ввода пользователя
        Scanner scanner = new Scanner(System.in);

        // Запрашиваем у пользователя ввод его имени
        System.out.print("Введите ваше имя: ");
        String name = scanner.nextLine();

        // Выводим приветствие на консоль
        System.out.println("Привет, " + name + "!");
    }
}
