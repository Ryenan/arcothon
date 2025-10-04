import "dotenv/config";
import express from 'express';
import cors from 'cors';
import userRouter from './routes/users.js'
import doctorRouter from './routes/doctor.js'
import motoristaRouter from './routes/motorista.js'
import agendamentoRouter from './routes/agendamento.js'

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/doctor', doctorRouter);
app.use('/motorista', motoristaRouter);
app.use('/agendamentos', agendamentoRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});