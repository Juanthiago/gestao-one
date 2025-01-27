const { Entity, PrimaryGeneratedColumn, Column } = ('typeorm')
import (User) = './user.model.js';

@Entity()
class Product {
    @PrimaryGeneratedColumn('uuid')
    id;

    @Column()
    name;

    @Column('integer')
    quantity;

    @Column('decimal')
    unitPrice;

    @ManyToOne(()  => User, (user) => user.product)
    user;
}

module.exports = Product;