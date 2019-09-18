const { prisma } = require("./generated/prisma-client");

async function main() {
  const newUser = await prisma.createUser({ name: "Alice", country: "Kenya" });
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
  console.log("Create country :" + newUser.country);
  const allUsers = await prisma.users();
  console.log(allUsers);
}

async function crud() {
  const newUser = await prisma.createUser({
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        { title: "Join us for GraphQl Conf in 2019" },
        { title: "Subscribe to GraphQl Weekly for GraphQl news" }
      ]
    }
  });

  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);

  const allUsers = await prisma.users();
  console.log(allUsers);

  const allPosts = await prisma.posts();
  console.log(allPosts);
}

async function userPosts() {
  console.log("===================== user posts ==================");
  const postsByUser = await prisma.user({ email: "bob@prisma.io" }).posts();

  console.log(`All posts by that user: ${JSON.stringify(postsByUser)}`);
}

// crud().catch(e => console.error(e));
userPosts().catch(e => console.error(e));
