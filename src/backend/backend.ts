import express from 'express';
import { Server, ic, query } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
} from 'azle/canisters/management';

export default Server(
    // Server section
    () => {
        const app = express();
        app.use(express.json());

        // Simpan data sertifikat
        let certificates: { name: string, description: string, eventName: string, date: string }[] = [];

        // Endpoint untuk mendapatkan semua sertifikat
        app.get('/certificates', (_req, res) => {
            res.json(certificates);
        });

        // Endpoint untuk menambahkan sertifikat baru
        app.post('/certificates/add', (req, res) => {
            const { names, description, eventName } = req.body;

            // Memproses input nama, deskripsi, dan nama acara
            const newCertificates = names.split('\n').map((name: string) => ({
                name,
                description,
                eventName,
                date: new Date().toISOString()
            }));

            certificates = [...certificates, ...newCertificates];
            res.json({ status: 'Certificates generated', certificates: newCertificates });
        });

        // Endpoint untuk mengambil data sertifikat
        app.get('/greet', (req, res) => {
            res.json({ greeting: `Hello, ${req.query.name}` });
        });

        // app.post('/price-oracle', async (req, res) => {
        //     ic.setOutgoingHttpOptions({
        //         maxResponseBytes: 20_000n,
        //         cycles: 500_000_000_000n,
        //         transformMethodName: 'transform'
        //     });

        //     const date = '2024-04-01';
        //     const response = await (await fetch(`https://api.coinbase.com/v2/prices/${req.body.pair}/spot?date=${date}`)).json();
        //     res.json(response);
        // });

        app.use(express.static('/dist'));
        return app.listen();
    },
    // Candid section
    {
        // transform: query([HttpTransformArgs], HttpResponse, (args) => {
        //     return {
        //         ...args.response,
        //         headers: []
        //     };
        // })
    }
);
