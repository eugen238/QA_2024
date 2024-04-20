class Car extends Thread {
    private final ParkingLot parkingLot;
    private final long maxWaitTime;

    public Car(String name, ParkingLot parkingLot, long maxWaitTime) {
        super(name);
        this.parkingLot = parkingLot;
        this.maxWaitTime = maxWaitTime;
    }

    @Override
    public void run() {
        try {
            System.out.println(getName() + " приехал на автостоянку.");
            if (parkingLot.tryPark(maxWaitTime)) {
                System.out.println(getName() + " припарковался.");
                Thread.sleep((long) (Math.random() * 5000)); // Имитация времени, проведенного на стоянке
                System.out.println(getName() + " уехал с автостоянки.");
                parkingLot.leave();
            } else {
                System.out.println(getName() + " не смог припарковаться и уехал.");
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}