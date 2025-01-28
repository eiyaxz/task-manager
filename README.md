# task-manager 📓
A simple API for managing tasks.

## how to install 🤖
1. Clone the repository by using `git clone https://github.com/eiyaxz/task-manager.git`;
2. Enter the repository's folder by using `cd task-manager`;
3. Install the dependencies by using `npm install`;
4. Run the server by using `npm run start`;
5. Use a tool like [Insomnia](https://insomnia.rest) to test endpoints.

## endpoints ⛓️
### user endpoints 🧏
| Method | Path | Description | Requires JWT authentication? | Requires being admin? | Request body |
|--------|------|-------------|------------------------------|-----------------------|--------------|
| `POST` | `/users/create` | Creates a new user | No | No | `username: string`, `password: string` |
| `POST` | `/users/login` | Log in to an account | No | No | `username: string`, `password: string` |
| `GET` | `/users/index` | Indexes all registered users | Yes | Yes | N/A |
| `GET` | `/users/index/:username` | Index a user by their username | Yes | Yes | N/A |
| `PUT` | `/users/update` | Update a user's password | Yes | No | `old_password: string`, `new_password: string` |
| `DELETE` | `/users/delete/:username` | Delete a user by their username | Yes | Yes | N/A |

### task endpoints 📝
| Method | Path | Description | Requires JWT authentication? | Requires being admin? | Request body |
|--------|------|-------------|------------------------------|-----------------------|--------------|
| `POST` | `/tasks/create` | Creates a new task | Yes | No | `description: string` |
| `GET` | `/tasks/index` | Lists all of an user's tasks | Yes | No | N/A |
| `PUT` | `/tasks/update/:id` | Updates a task | Yes | No | `description: string`, `complete: boolean` |
| `DELETE` | `/tasks/delete/:id` | Deletes a task | Yes | No | N/A |

## missing features 🔭
- Hide tokens when listing all users (used for testing purposes);
- Being able to modify a user's role via endpoint;
- Add profile pictures to users;
- Add deadlines;
- Rate limiting.

### thanks for reading 👋
