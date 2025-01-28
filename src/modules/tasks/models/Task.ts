import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("tasks")
export class Task {
    @ObjectIdColumn()
    _id?: string;

    @Column()
    description!: string;

    @Column()
    complete?: boolean;

    @CreateDateColumn()
    created_at?: string;

    @UpdateDateColumn()
    updated_at?: string;

    @Column()
    owner!: string;

    @BeforeInsert()
    generateId() {
        if (!this._id) {
            this._id = v4();
        }
    }

    @BeforeInsert()
    generateCompleted() {
        if (!this.complete) {
            this.complete = false;
        }
    }
}