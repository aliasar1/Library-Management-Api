const calculateRentalRate = (weeklyRentalRate, customerCreatedAt) => {
    const weeksSinceRegistration = Math.ceil((Date.now() - customerCreatedAt.getTime()) / (7 * 24 * 60 * 60 * 1000));

    const rentalRate = weeklyRentalRate * weeksSinceRegistration;

    return rentalRate;
};

module.exports = { calculateRentalRate };