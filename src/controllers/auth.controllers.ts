import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// metodo para crear un usuario

export const signup = async (req: Request, res: Response) => {

    // Guardar el nuevo usuario
    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    // verificar si el email ya existe

    const emailFound = await User.findOne({ email: user.email })

    if (emailFound) return res.status(400).json({ error: 'El correo ya existe' })

    // encriptar la contraseña

    user.password = await user.encryptPassword(user.password);

    const savedUser = await user.save();

    // Crear un token
    const token: string = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: '20m'
    })

    res.header("auth-token", token).json({ user: savedUser, message: "Usuario creado" })
}

// metodo para logear un usuario
export const signin = async (req: Request, res: Response) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json('El correo no existe ho contraseña es incorrecta')

    const correctPassword: boolean = await user.validatePassword(req.body.password)

    if (!correctPassword) return res.status(400).json('contraseña incorrecta')


    // Crear un token

    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: '20m'
    })

    res.header("auth-token", token).json({ user, message: "signin" })

}

// metodo para obtener el perfil de un usuario
export const profile = async (req: Request, res: Response) => {

    const user = await User.findById(req.userId, { password: 0 })
    if (!user) return res.status(400).json('usuario no encontrado')

    res.json(user);

}
