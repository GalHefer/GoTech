import { ApiResponse } from '../infra/rest/api-response';
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response';
import { expect } from 'chai';


import restaurantsAPI from '../logic/REST/restaurantsAPI';

describe('Restaurants tests', () => {

    before('Reset restaurant server', async () => {
        //Arrange
        await restaurantsAPI.resetServer();
    })

    it('Validate the amount of restaurants', async () => {
        //Act
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();

        //Assert
        expect(restaurants.success).to.be.true;
        const actualAmount = restaurants.data?.length;
        expect(actualAmount).to.equal(3, 'Restaurants amount is not as expected');
    })

    it('Get restaurant by id', async () => {
        //Arrange
        const myNewRest = { address: "My Addess 1", id: 233, name: "My Restaurant", score: 2.3 };
        const createResponse = await restaurantsAPI.createRestaurant(myNewRest);

        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(233);

        //Assert
        expect(getByIdResponse.status).to.equal(200);
        expect(getByIdResponse.success).to.be.true;
        expect(getByIdResponse.data).to.deep.equal(myNewRest);
    })

    it('Get non exsisting restaurant', async () => {
        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(9999999);

        //Assert
        expect(getByIdResponse.error).to.equal("restaurant with given id not found");
        expect(getByIdResponse.success).to.be.false;
        expect(getByIdResponse.status).to.equal(404);
    })

    it('validate score between 0-5', async () => {

        //Arrange
        const myNewRest = { address: "My Addess 1", id: 233, name: "My Restaurant", score: 10 }; //score beyond limits of 0-5
        const createResponse = await restaurantsAPI.createRestaurant(myNewRest);

        //Act
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();

        //Assert
        var actualAmount = 0;
        if (restaurants.data?.length != null) {
            actualAmount = restaurants.data?.length;
        }
        if (restaurants.data) {
            for (let index = 0; index < actualAmount; index++) {

                if (restaurants.data[index].score > 5 || restaurants.data[index].score < 0) {
                    console.log("a restaurant's score is off the limit of 0-5");
                }
            }
        }
    }
    )


    // it('replaces a restaurant', async () => {
    //     //Act
    //     const restaurants1: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();
    //     //Assert
    //     if (restaurants1.data) {
    //         const myNewRest = { address: "REEEEEEEEEEEEE", id: restaurants1.data[0].id, name: restaurants1.data[0].name, score: restaurants1.data[0].score };
    //         const createResponse = await restaurantsAPI.createRestaurant(myNewRest);

    //         restaurants1.data[0] = restaurants1.data[restaurants1.data.length];
    //         await restaurants1.data.pop;
    //         await restaurants1.data.splice(0, 1)

    //     }
    //     const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();

    //     //display results







    //     var actualAmount = 0;
    //     if (restaurants.data?.length != null) {
    //         actualAmount = restaurants.data?.length;
    //     }
    //     if (restaurants.data) {
    //         for (let index = 0; index < actualAmount; index++) {
    //             console.log("name: " + restaurants.data[index].name +
    //                 "\n" + "score: " + restaurants.data[index].score +
    //                 "\n" + "address: " + restaurants.data[index].address +
    //                 "\n" + "id: " + restaurants.data[index].id + "\n")
    //         }
    //     }
    //     console.log(actualAmount);
    // })

})
