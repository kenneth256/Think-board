// import express from 'express';
// import notesRoutes from './notesRoutes.js';
// import { connectDB } from './Cong/bd.js';
// import handler from './controllers/rateLimit.js';
// import cors from 'cors'
// import path from 'path';

// const startServer = async() => {
//     try {

//         const app = express();
//         if(process.env.NODE_ENV !== 'production') {
//             app.use(cors({
//                 origin: '*'  // Changed from 'url' to 'origin'
//             }))
//         }
//         const __dirname = path.resolve()
        
//         app.use(express.json());
//         app.use(handler)
//         app.use("/api/notes", notesRoutes);
       

//         if(process.env.NODE_ENV === "production") {
//             // Serve static files
//             app.use(express.static(path.join(__dirname, '../Frontend/dist')));
//             app.get('*', (req, res) => {
//                 res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
//             });
//         }
        
//         connectDB().then(() => {
//             app.listen(5000, () => {
//                 console.log("Server running on port 5000");
//             })
//         });
//     } catch (error) {
//         console.error("Failed to start server:", error);
//     }
// };

// startServer();

import express from 'express';
import notesRoutes from './notesRoutes.js';  // UNCOMMENTED
import { connectDB } from './Cong/bd.js';
import handler from './controllers/rateLimit.js';
import cors from 'cors'
import path from 'path';

const startServer = async() => {
    try {

        const app = express();
        if(process.env.NODE_ENV !== 'production') {
            app.use(cors({
                origin: '*'  // Changed from 'url' to 'origin'
            }))
        }
        const __dirname = path.resolve()
        
        app.use(express.json());
        app.use(handler)
        app.use("/api/notes", notesRoutes);
       
        // Test route to verify server works
        app.get('/api/test', (req, res) => {
            res.json({ message: 'Server is working!' });
        });

        if(process.env.NODE_ENV === "production") {
            // Serve static files first
            app.use(express.static(path.join(__dirname, '../Frontend/dist')));
            
            // SPA fallback - catch all non-API routes
            app.get(/^(?!\/api).*/, (req, res) => {
                res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
            });
        }
        
        connectDB().then(() => {
            app.listen(5000, () => {
                console.log("Server running on port 5000");
            })
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();