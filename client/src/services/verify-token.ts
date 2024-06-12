import { client } from "@/lib/studio";

export const verify_token = async ({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) => {
  const query = `*[_type =='otp' && token == '${token}']{
    _id, created_at, activated_at, user { _ref }
  }`;

  try {
    const tokens = await client.fetch(query);

    if (tokens.length) {
      const currentuserToken = tokens.find(
        (tkn: { user: { _ref: string } }) => tkn.user._ref === userId
      );

      if (!currentuserToken) {
        return {
          error: "Invalid token. Please use the link we sent to your email.",
        };
      }

      const { _id, created_at, activated_at } = currentuserToken;

      if (activated_at) {
        return {
          error: "Token already used. Please contact your system admin.",
        };
      }

      const then = new Date(created_at);
      const now = new Date();
      const timeDelta = now.getTime() - then.getTime();
      const hoursDifference = timeDelta / (1000 * 60 * 60);

      if (hoursDifference > 24) {
        return { error: "This token has expired. Please request a new one." };
      }

      const transaction = client.transaction();
      transaction.patch(userId, { set: { active: true } }); // Ensure the user is marked as verified
      transaction.patch(_id, {
        set: { activated_at: new Date().toISOString() },
      });

      await transaction.commit();
      return { success: true };
    }

    return {
      error: "Invalid token format. Please use the link we sent to your email.",
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    return { error: "Server error. Please try again later." };
  }
};
