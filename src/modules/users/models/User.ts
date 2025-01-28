import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import { v4 } from "uuid";

import { generateToken } from "../../../auth";

@Entity("users")
export class User {
    @ObjectIdColumn()
    _id?: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    role?: string;

    @CreateDateColumn()
    created_at?: string;

    @Column()
    access_token?: string;

    @BeforeInsert()
    generateId() {
        if (!this._id) {
            this._id = v4();
        }
    }

    @BeforeInsert()
    generateRole() {
        if (!this.role) {
            this.role = "member";
        }
    }

    @BeforeInsert()
    generateAccessToken() {
        if (!this.access_token) {
            this.access_token = generateToken({ _id: this._id, username: this.username });
        }
    }
}