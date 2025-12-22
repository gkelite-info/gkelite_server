import { DataTypes, Optional, Model } from "sequelize";
import sequelizeConnection from "../config";

interface UserAttributes {
    userId: number;
    userName: string;
    mobile: string;
    email: string;
    password:string;
    address: string;
    role: string;
    isdeleted: boolean;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

}

export interface UserInput extends Optional<UserAttributes, "userId"> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public userId!: number
    public userName!: string
    public mobile!: string
    public email!: string
    public password!:string
    public address!: string
    public role!: string


    public isdeleted!: boolean
    public createdAt?: Date
    public updatedAt?: Date
    public deletedAt?: Date


}

User.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    userName: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },

    mobile: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: true
    },

   address: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: { 
        len: [5, 255]
    }
    },
    role: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    isdeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
} , {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: "users"
});

export default User;  