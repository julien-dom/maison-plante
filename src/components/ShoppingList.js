import { plantList } from '../datas/plantList'
import PlantItem from './PlantItem'
import '../styles/ShoppingList.css'

function ShoppingList({ cart, updateCart }) {
	const categories = plantList.reduce(
		(acc, plant) =>
			acc.includes(plant.category) ? acc : acc.concat(plant.category),
		[]
	)

	function addToCart(name, price) {
		const currentPlantSaved = cart.find((plant) => plant.name === name)
		if (currentPlantSaved) {
			const cartFilteredCurrentPlant = cart.filter(
				(plant) => plant.name !== name
			)
			updateCart([
				...cartFilteredCurrentPlant,
				{ name, price, amount: currentPlantSaved.amount + 1 }
			])
		} else {
			updateCart([...cart, { name, price, amount: 1 }])
		}
	}

    const deleteFromCart = (name, price) => {
        const currentPlantSaved = cart.find((plant) => plant.name === name);
        if (currentPlantSaved.amount > 1) {
          const updatedCart = cart.map((plant) =>
            plant.name === name ? { ...plant, amount: plant.amount - 1 } : plant
          );
          updateCart(updatedCart);
        } else {
          const updatedCart = cart.filter((plant) => plant.name !== name);
          updateCart(updatedCart);
        }
      };

	return (
		<div className='lmj-shopping-list'>
			<ul>
				{categories.map((cat) => (
					<li key={cat}>{cat}</li>
				))}
			</ul>
			<ul className='lmj-plant-list'>
				{plantList.map(({ id, cover, name, water, light, price }) => (
					<div key={id}>
						<PlantItem
							cover={cover}
							name={name}
							water={water}
							light={light}
							price={price}
						/>
						<button onClick={() => addToCart(name, price)}>Ajouter</button>
                        <button onClick={() => deleteFromCart(name, price)}>Retirer</button>
					</div>
				))}
			</ul>
		</div>
	)
}

export default ShoppingList
