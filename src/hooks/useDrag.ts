import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {setDraggingItemId} from '../features/dragging/draggingSlice';

export const useDrag = () => {
    const dispatch = useDispatch();
    const draggingItemId = useSelector((state: RootState) => state.dragging.draggingItemId);

    const startDrag = (id: string) => dispatch(setDraggingItemId(id));
    const endDrag = () => dispatch(setDraggingItemId(null));

    return {draggingItemId, startDrag, endDrag};
};
