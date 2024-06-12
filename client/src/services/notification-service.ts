import {client} from "@/lib/studio";

export const get_user_notifications =async (userId: {userId: string}) =>{
    const query = `*[_type == "notification" && (audience == $userId && viewed ==false)]{
            _id, body, viewed
    }`;
    const params = { userId };
    return await client.fetch(query, params);
}

export const read_notification =async ({_id}: {_id: string}) =>{

    const notification =await client.patch(_id).set(
        { viewed:  true, }
    ).commit();
    // @ts-ignore
    return {notification: notification?._id}
}

export const push_notification =async ({audience, body}: {audience: string, body: string}) =>{

    const notification = await client.create({
        _type: 'notification',
        audience: audience,
        body,
        viewed: false,
    });

    return {_id: notification._id}
}