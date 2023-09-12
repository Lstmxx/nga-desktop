import { IPlate } from '@/lib/api/plate/get-all/type';
import { Card, CardContent, Typography } from '@mui/material';
import Node from './node';

type PlateProps = {
	plates: IPlate[];
};

const ContentTree = (props: PlateProps) => {
	return (
		<>
			{props.plates.map((plate, index) => (
				<div className='flex flex-wrap' key={index}>
					{plate.fid && <Node node={plate} />}
					{plate.content && plate.content.length > 0 && plate.name && (
						<Typography className='w-full' gutterBottom variant='h6' component='div'>
							{plate.name}
						</Typography>
					)}
					{plate.content && plate.content.length > 0 && ContentTree({ plates: plate.content })}
				</div>
			))}
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
