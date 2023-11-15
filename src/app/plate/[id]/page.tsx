import Detail from '../components/detail';
import RouterButton from '../components/router-button';

export default async function Plate({ params }: { params: { id: string } }) {
	return (
		<div>
			<RouterButton></RouterButton> {params.id}
			<Detail id={params.id} />
		</div>
	);
}
