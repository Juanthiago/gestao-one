const {Entity, PrimaryGeneratedColumn, Column, ManyToOne} = require('typeorm');
import (User) = './user.model.js';

@Entity()
class Transaction {
    @PrimaryGeneratedColumn()
    id;
    @Column()
    type;
    @Column()
    amount;
    @Column()
    category;
    @Column()
    description;
    @ManyToOne(() => User, (user) => user.Transaction)
    user;
}