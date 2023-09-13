'use client';

import { assetHostConfig } from '@/config/host';
import { IPlate } from '@/lib/api/plate/get-all/type';

type NodeProps = {
	node: IPlate;
};

export default function Node(props: NodeProps) {
	return (
		<div className='flex items-start p-2 rounded bg-redwood-200 overflow-hidden cursor-pointer mb-2'>
			<img
				className='h-10 w-10 rounded-full bg-redwood-300 mr-2'
				src={`${assetHostConfig.icon}/${props.node.fid}u.png?${Math.random()}`}
				referrerPolicy='no-referrer'
				alt=''
			/>
			<div className='flex flex-col overflow-hidden'>
				<span className='truncate font-bold text-redwood-400'>{props.node.name}</span>
				<span className='truncate text-sm text-redwood-100'>{props.node.info}</span>
			</div>
		</div>
	);
}
