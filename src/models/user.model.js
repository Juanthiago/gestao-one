import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id;
    @Column()
    email;
    @Column()
    password;
    @Column()
    cpfCnpj;
    @Column()
    accountType;
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creadtAt;
}
