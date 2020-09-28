import {gql} from "apollo-boost";

type Artist {
    name: String!,
}
type Song {
    title: String!,
    sounCloud: String!
    artists: [Artist]
}
type Post {
    title: String!
    description: String!
    songs: [Song]

}
export const CREATE_USER = gql`
    mutation signInUser(
        $email: String!,
        $password: String!,
        $passwordConfirmation: String!,
        $firstName: String,
        $lastName: String,
        $role: String,
        $post: Post
    ) {
        createUser(input: {
            attributes: {
                email: $email,
                password: $password,
                passwordConfirmation: $passwordConfirmation,
                firstName: $firstName,
                lastName: $lastName,
                role: $role,
                post: $post
            }

        }) {
            id
        }
    }
`;
