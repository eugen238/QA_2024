public class SumAndProduct {
    public static void main(String[] args) {
        // Проверяем, есть ли аргументы командной строки
        if (args.length == 0) {
            System.out.println("Нет аргументов командной строки для подсчета.");
            return;
        }

        // Инициализируем переменные для суммы и произведения
        int sum = 0;
        int product = 1;

        // Проходим по каждому аргументу командной строки
        for (int i = 0; i < args.length; i++) {
            // Парсим текущий аргумент в целое число
            try {
                int num = Integer.parseInt(args[i]);
                // Добавляем число к сумме
                sum += num;
                // Умножаем число на произведение
                product *= num;
            } catch (NumberFormatException e) {
                // В случае ошибки формата числа выводим сообщение и переходим к следующему
                // аргументу
                System.out.println("Некорректный формат числа: " + args[i]);
            }
        }

        // Выводим результаты на консоль
        System.out.println("Сумма чисел: " + sum);
        System.out.println("Произведение чисел: " + product);
    }
}
