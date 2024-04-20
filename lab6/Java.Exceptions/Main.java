// PS D:\Универ\6 семестр\AQA\Software-Testing\lab6\Java.Exceptions> javac Faculty.java Group.java Main.java Student.java Subject.java University.java
// PS D:\Универ\6 семестр\AQA\Software-Testing\lab6\Java.Exceptions> java Main

class GradeOutOfRangeException extends RuntimeException {
        public GradeOutOfRangeException(String message) {
                super(message);
        }
}

class NoSubjectsException extends RuntimeException {
        public NoSubjectsException(String message) {
                super(message);
        }
}

class NoStudentsInGroupException extends RuntimeException {
        public NoStudentsInGroupException(String message) {
                super(message);
        }
}

class NoGroupsInFacultyException extends RuntimeException {
        public NoGroupsInFacultyException(String message) {
                super(message);
        }
}

class NoFacultiesInUniversityException extends RuntimeException {
        public NoFacultiesInUniversityException(String message) {
                super(message);
        }
}

public class Main {
        public static void main(String[] args) {
                // Создаем университет
                University university = new University();

                // Создаем факультеты
                Faculty faculty1 = new Faculty("Факультет информационных технологий");
                Faculty faculty2 = new Faculty("Факультет естественных наук");

                // Добавляем факультеты в университет
                // Отсутствие факультетов в университете (заком 2 строки ниже)
                university.addFaculty(faculty1);
                university.addFaculty(faculty2);

                // Создаем группы
                Group group1 = new Group("Группа ИТ-1");
                Group group2 = new Group("Группа ЕН-1");

                // Добавляем группы на факультеты
                // Отсутствие групп на факультете (заком 2 строки ниже)
                faculty1.addGroup(group1);
                faculty2.addGroup(group2);

                // Создаем студентов
                Student student1 = new Student("Иванов", group1);
                Student student2 = new Student("Петров", group1);
                Student student3 = new Student("Сидоров", group2);

                // Добавляем студентов в группы
                // Отсутствие студентов в группе (закоментить ниже две строки)
                group1.addStudent(student1);
                group1.addStudent(student2);
                group2.addStudent(student3);

                // Создаем предметы
                Subject subject1 = new Subject("Математика");
                Subject subject2 = new Subject("Физика");
                Subject subject3 = new Subject("Информатика");

                // Добавляем предметы студентам
                // Отсутсвие предметов у студента (должен быть хотя бы один) (закоменить ниже
                // две строки)
                student1.addSubject(subject1);
                student1.addSubject(subject2);
                student2.addSubject(subject1);
                student3.addSubject(subject3);

                // Релизовать следующие исключения:

                // Оценка ниже 0 или выше 10
                // subject1.addGrade(-4);

                subject1.addGrade(10);
                subject1.addGrade(9);
                subject1.addGrade(8);

                subject2.addGrade(6);
                subject2.addGrade(7);
                subject2.addGrade(8);

                subject3.addGrade(6);
                subject3.addGrade(4);
                subject3.addGrade(8);

                // Посчитать средний балл по всем предметам студента
                try {
                        double studentAverageGrade = student1.calculateAverageGrade();
                        System.out.println("Средний балл студента " + student1.name + ": " + studentAverageGrade);
                } catch (NoSubjectsException e) {
                        System.out.println("Студент " + student1.name + " не имеет предметов");
                }

                // Посчитать средний балл по конкретному предмету в конкретной группе и на
                // конкретном факультете
                try {
                        double subjectAverageGradeInGroup = group1.calculateAverageGradeBySubject(subject1);
                        System.out.println("Средний балл по предмету " + subject1.name + " в группе "
                                        + group1.name + ": " + subjectAverageGradeInGroup);
                } catch (NoStudentsInGroupException e) {
                        System.out.println("В группе " + group1.name + " нет студентов");
                } catch (NoSubjectsException e) {
                        System.out.println("В группе " + group1.name + " нет студентов с предметом "
                                        + subject1.name);
                }

                // Посчитать средний балл по предмету для всего университета
                try {
                        double subjectAverageGradeInUniversity = university.calculateAverageGradeBySubject(subject1);
                        System.out.println("Средний балл по предмету " + subject1.name + " в университете: "
                                        + subjectAverageGradeInUniversity);
                } catch (NoGroupsInFacultyException e) {
                        System.out.println("На факультете нет групп");
                } catch (NoFacultiesInUniversityException e) {
                        System.out.println("В университете нет факультетов");
                } catch (NoSubjectsException e) {
                        System.out.println("В университете нет групп с предметом " + subject1.name);
                }
        }
}
