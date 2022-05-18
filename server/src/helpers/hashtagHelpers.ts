import { Hashtag } from '../models/Hashtag'



export const createHashtag = (hashtags: string[]) => {

    hashtags.forEach(async (hashtag) => {
        const foundHashtag = await Hashtag.findOne({ name: hashtag })

        if (foundHashtag) {

            await Hashtag.findOneAndUpdate({ name: hashtag }, { $inc: { amount: 1 } })

        }

        else {

            await new Hashtag({ name: hashtag, amount: 1 }).save()
        }
    })

}

export const updateHashtag = async (hashtags: string[], existedHashtags: string[]) => {

    await deleteHashtag(existedHashtags)

    createHashtag(hashtags)

}




export const deleteHashtag = (hashtags: string[]) => {

    hashtags.forEach(async (hashtag) => {

        const existedHashtag = await Hashtag.findOne({ name: hashtag })
        if (existedHashtag?.amount === 1) {
            await Hashtag.findOneAndDelete({ name: hashtag })
        }
        else {
            await Hashtag.findOneAndUpdate({ name: hashtag }, { $inc: { amount: -1 } })
        }
    })
}


