import { User } from './User';
import { Tema } from './Tema';

export class Postagem{
    public id: number
    public titulo:string
	public texto:string
	public date: Date
	public tema: Tema;
	public usuario : User;
	
}