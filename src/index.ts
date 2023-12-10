import express from 'express';
import helment from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import { generateRandomID } from './services/token';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// default middlewares
app.use(helment());
app.use(cors());
app.use(json());

// create participant and generate token
app.post('/generate-token', async (req, res) => {
    // grab participant's infromation form request
    const { name, phoneNumber, companyName, designation, answer } = req.body;

    // init token
    let token: string;

    // this loop that will continuously check
    // if our newly generated token already exsits in table
    // if not, break the loop and keep the new generated token
    // this will make sure our token always unique and non-repeated
    while (true) {
        // generate unique 6-digit token
        token = generateRandomID();

        // find if token already exisits
        const user = await prisma.participant.findUnique({
            where: {
                token,
            },
        });

        // if not, break out of the loop
        if (!user) {
            break;
        }
    }

    // create participant, including token
    const participant = await prisma.participant.create({
        data: {
            name,
            token,
            phoneNumber,
            companyName,
            designation,
            answer,
        },
    });

    res.status(201).json({
        participant,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`App is listening at port ${process.env.PORT}...`);
});
