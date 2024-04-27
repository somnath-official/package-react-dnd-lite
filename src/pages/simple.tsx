import { useEffect, useState } from "react"
import { DNDContainer, DNDItem, IElementDrop } from "../../lib/main"
import { loadImage } from "../utils/Image"

interface IImageType {
    id: number
    title: string
    size: string
    source: string
}

const IMAGES: IImageType[] = [
    {
        id: 1,
        title: 'IMG-1',
        size: '150.2 KB',
        source: '../assets/simple-page/IMG-1.jpg',
    },
    {
        id: 2,
        title: 'IMG-2',
        size: '59.0 kB',
        source: '../assets/simple-page/IMG-2.jpg',
    },
    {
        id: 3,
        title: 'IMG-3',
        size: '94.0 kB',
        source: '../assets/simple-page/IMG-3.jpg',
    },
    {
        id: 4,
        title: 'IMG-4',
        size: '58.5 kB',
        source: '../assets/simple-page/IMG-4.jpg',
    },
    {
        id: 5,
        title: 'IMG-5',
        size: '28.0 kB',
        source: '../assets/simple-page/IMG-5.jpg',
    },
    {
        id: 6,
        title: 'IMG-6',
        size: '93.0 kB',
        source: '../assets/simple-page/IMG-6.jpg',
    },
    {
        id: 7,
        title: 'IMG-7',
        size: '42.7 kB',
        source: '../assets/simple-page/IMG-7.jpg',
    }, {
        id: 8,
        title: 'IMG-8',
        size: '31.1 kB',
        source: '../assets/simple-page/IMG-8.jpg',
    },
    {
        id: 9,
        title: 'IMG-9',
        size: '73.7 kB',
        source: '../assets/simple-page/IMG-9.jpeg',
    },
]

export const Simple = () => {
    const [images, setImages] = useState<IImageType[]>([])

    useEffect(() => {
        setImages(IMAGES)
    }, [])

    const onDrop = (e: IElementDrop) => console.log(e)

    return (
        <DNDContainer onDrop={onDrop}>
            <div>
                <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {images.map((image) => (
                        <DNDItem id={image.id.toString()} key={image.id} >
                            <li className="relative">
                                <Image imageData={image} />
                            </li>
                        </DNDItem>
                    ))}
                </ul>
            </div>
        </DNDContainer>
    )
}

const Image = ({ imageData }: { imageData: IImageType }) => {
    const [image, setImage] = useState('')
    useEffect(() => {
        loadImage(imageData.source)
            .then(path => {
                setImage(path)
            })
    }, [imageData.source])

    return (
        <>
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img src={image} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{imageData.title}</p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">{imageData.size}</p>
        </>
    )
}
