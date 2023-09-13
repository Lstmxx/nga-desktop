import { IPlate } from '@/lib/api/plate/get-all/type';
import { Card, CardContent, Typography } from '@mui/material';
import Node from './node';

type PlateProps = {
	plates: IPlate[];
};

const ContentTree = (props: PlateProps) => {
	return (
		<>
			{props.plates.map((plate, index) => {
				if (plate.fid) {
					return <Node node={plate} key={index} />;
				}
				if (plate.content && plate.content.length > 0) {
					return (
						<div key={index}>
							<Typography className='w-full' gutterBottom variant='h6' component='div'>
								{plate.name}
							</Typography>
							<div className='grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2'>
								<ContentTree plates={plate.content} />
							</div>
						</div>
					);
				}
				return null;
			})}
		</>
	);
};

export default function Plate(props: PlateProps) {
	return (
		<div className='flex flex-col w-full'>
			{props.plates
				.filter((plate) => plate.content[0].content.length > 0)
				.map((plate, index) => (
					<Card className='m-2 bg-redwood-50' key={index}>
						<CardContent>
							<Typography gutterBottom variant='h6' component='div'>
								{plate.name}
							</Typography>
							<div className='flex flex-col'>{ContentTree({ plates: plate.content })}</div>
						</CardContent>
					</Card>
				))}
		</div>
	);
}
