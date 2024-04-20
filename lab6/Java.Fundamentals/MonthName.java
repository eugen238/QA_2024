import java.util.Scanner;

public class MonthName {
    public static void main(String[] args) {
        // Создаем объект Scanner для считывания ввода пользователя
        Scanner scanner = new Scanner(System.in);

        // Запрашиваем у пользователя ввод числа от 1 до 12
        int monthNumber;
        do {
            System.out.print("Введите число от 1 до 12: ");
            while (!scanner.hasNextInt()) {
                System.out.println("Некорректный ввод. Введите число от 1 до 12.");
                System.out.print("Введите число от 1 до 12: ");
                scanner.next();
            }
            monthNumber = scanner.nextInt();
        } while (monthNumber < 1 || monthNumber > 12);

        // Определяем название месяца
        String monthName;
        switch (monthNumber) {
            case 1:
                monthName = "Январь";
                break;
            case 2:
                monthName = "Февраль";
                break;
            case 3:
                monthName = "Март";
                break;
            case 4:
                monthName = "Апрель";
                break;
            case 5:
                monthName = "Май";
                break;
            case 6:
                monthName = "Июнь";
                break;
            case 7:
                monthName = "Июль";
                break;
            case 8:
                monthName = "Август";
                break;
            case 9:
                monthName = "Сентябрь";
                break;
            case 10:
                monthName = "Октябрь";
                break;
            case 11:
                monthName = "Ноябрь";
                break;
            case 12:
                monthName = "Декабрь";
                break;
            default:
                monthName = "Недопустимый месяц";
                break;
        }

        // Выводим название месяца на консоль
        System.out.println("Название месяца: " + monthName);
    }
}
