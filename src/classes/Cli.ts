// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import Driveable from "../interfaces/Driveable.js"; 

// define the Cli class
class Cli
{
  // TODO: update the vehicles property to accept Truck and Motorbike objects as well
  // TODO: You will need to use the Union operator to define additional types for the array
  // TODO: See the AbleToTow interface for an example of how to use the Union operator
  vehicles: ( Car | Motorbike | Truck )[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // TODO: Update the constructor to accept Truck and Motorbike objects as well
  constructor ( vehicles: ( Car | Motorbike | Truck )[] )
  {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin (): string
  {
    // return a random string
    return (
      Math.random().toString( 36 ).substring( 2, 15 ) +
      Math.random().toString( 36 ).substring( 2, 15 )
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle (): void
  {
    inquirer
      .prompt( [
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map( ( vehicle ) =>
          {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          } ),
        },
      ] )
      .then( ( answers ) =>
      {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      } );
  }

  // method to create a vehicle
  createVehicle (): void
  {
    inquirer
      .prompt( [
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // TODO: Update the choices array to include Truck and Motorbike
          choices: [ 'Car', 'Truck', 'Motorbike' ],
        },
      ] )
      .then( ( answers ) =>
      {
        if ( answers.vehicleType === 'Car' )
        {
          // create a car
          this.createCar();

    // TODO: add statements to create a truck or motorbike if the user selects the respective vehicle type

        } else if ( answers.vehicleType === 'Truck' )
        {
          this.createTruck();
        }
        else if ( answers.vehicleType === 'Motorbike' )
        {
          this.createMotorbike();
        }
      } );
  }

  // method to create a car
  createCar (): void
  {
    inquirer
      .prompt( [
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ] )
      .then( ( answers ) =>
      {
        const car = new Car(
          // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt( answers.year ),
          parseInt( answers.weight ),
          parseInt( answers.topSpeed ),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push( car );
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      } );
  }

  // method to create a truck
  createTruck (): void
  {
    inquirer
      .prompt( [
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ] )
      .then( ( answers ) =>
      {
        // TODO: Use the answers object to pass the required properties to the Truck constructor
        // TODO: push the truck to the vehicles array
        // TODO: set the selectedVehicleVin to the vin of the truck
        // TODO: perform actions on the truck

        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt( answers.year ),
          parseInt( answers.weight ),
          parseInt( answers.topSpeed ),
          [],
          parseInt( answers.towingCapacity ),

        );
        this.vehicles.push( truck );
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      } );
  }

  // method to create a motorbike
  createMotorbike (): void
  {
    inquirer
      .prompt( [
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ] )
      .then( ( answers ) =>
      {
        const motorbike = new Motorbike(
          // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt( answers.year ),
          parseInt( answers.weight ),
          parseInt( answers.topSpeed ),
          [
            new Wheel( parseInt( answers.frontWheelDiameter ), answers.frontWheelBrand ),
            new Wheel( parseInt( answers.rearWheelDiameter ), answers.rearWheelBrand ),
          ]
        );
        this.vehicles.push( motorbike );
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      } );
  }


  findVehicleToTow(truck: Truck): void {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'vehicleToTowVin',
                message: 'Select a vehicle to tow',
                choices: this.vehicles
                    .filter(vehicle => vehicle.vin !== truck.vin) // Exclude the truck itself
                    .map(vehicle => ({
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle.vin,
                    })),
            },
        ])
        .then(answers => {
            const vehicleToTow = this.vehicles.find(v => v.vin === answers.vehicleToTowVin);
            if (vehicleToTow) {
                truck.tow(vehicleToTow);
                console.log(`Successfully towed ${vehicleToTow.make} ${vehicleToTow.model} (VIN: ${vehicleToTow.vin})`);
            }
            this.performActions();
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}



  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt<{ action: string }>([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Tow',
            'Wheelie',
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        const vehicle = this.vehicles.find(v => v.vin === this.selectedVehicleVin);
  
        if (!vehicle) {
          console.log('No vehicle selected.');
          return;
        }
  
        switch (answers.action) {
          case 'Tow':
            if (vehicle instanceof Truck) {
              this.findVehicleToTow(vehicle);
            } else {
              console.log('Selected vehicle is not a truck.');
            }
            break;
          case 'Wheelie':
            if (vehicle instanceof Motorbike) {
              if (vehicle.started) {
                vehicle.wheelie();
                console.log('Performed a wheelie!');
              } else {
                console.log('Start the motorbike first.');
              }
            } else {
              console.log('Selected vehicle cannot perform a wheelie.');
            }
            break;
          case 'Print details':
            vehicle.printDetails();
            break;
          case 'Start vehicle':
            vehicle.start();
            break;
          case 'Accelerate 5 MPH':
            if (vehicle.started) {
              vehicle.accelerate(5);
            } else {
              console.log('Start the vehicle first.');
            }
            break;
          case 'Decelerate 5 MPH':
            if (vehicle.started) {
              vehicle.decelerate(5);
            } else {
              console.log('Start the vehicle first.');
            }
            break;
          case 'Stop vehicle':
            vehicle.stop();
            break;
          case 'Turn right':
            if (vehicle.started) {
              vehicle.turn('right');
            } else {
              console.log('Start the vehicle first.');
            }
            break;
          case 'Turn left':
            if (vehicle.started) {
              vehicle.turn('left');
            } else {
              console.log('Start the vehicle first.');
            }
            break;
          case 'Reverse':
            if (vehicle.started) {
              vehicle.reverse();
            } else {
              console.log('Start the vehicle first.');
            }
            break;
          case 'Select or create another vehicle':
            this.startCli();
            break;
          case 'Exit':
            this.exit = true;
            break;
          default:
            break;
        }
  
        if (!this.exit) {
          this.performActions();
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }

  // method to start the cli
  startCli (): void
  {
    inquirer
      .prompt( [
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: [ 'Create a new vehicle', 'Select an existing vehicle' ],
        },
      ] )
      .then( ( answers ) =>
      {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if ( answers.CreateOrSelect === 'Create a new vehicle' )
        {
          this.createVehicle();
        } else
        {
          this.chooseVehicle();
        }
      } );
  }
}

// export the Cli class
export default Cli;

