import React from 'react'
import { Text, Image } from 'react-native'
import Card from '../uikit/components/card'

type ProductCardProps = {
  product: Product
}

type Product = {
  name: string
  imageUrl: string
}

export default function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <Card size="large">
      <Image source={{ uri: product.imageUrl }} />
      <Text>{product.name}</Text>
    </Card>
  )
}
