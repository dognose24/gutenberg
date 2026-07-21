/**
 * Internal dependencies
 */
import { stopUndoRedoKeyboardShortcutPropagation } from '../modal';

describe( 'core/html modal', () => {
	describe( 'stopUndoRedoKeyboardShortcutPropagation()', () => {
		const createKeyboardEvent = ( overrides ) => ( {
			altKey: false,
			ctrlKey: false,
			metaKey: false,
			shiftKey: false,
			keyCode: 0,
			code: '',
			stopPropagation: jest.fn(),
			preventDefault: jest.fn(),
			...overrides,
		} );

		it.each( [
			[ 'undo', { ctrlKey: true, key: 'z', code: 'KeyZ' } ],
			[
				'redo with shift',
				{ ctrlKey: true, shiftKey: true, key: 'Z', code: 'KeyZ' },
			],
			[ 'redo with y', { ctrlKey: true, key: 'y', code: 'KeyY' } ],
		] )( 'stops propagation for %s', ( _label, eventOverrides ) => {
			const event = createKeyboardEvent( eventOverrides );

			stopUndoRedoKeyboardShortcutPropagation( event );

			expect( event.stopPropagation ).toHaveBeenCalledTimes( 1 );
			expect( event.preventDefault ).not.toHaveBeenCalled();
		} );

		it( 'does not stop propagation for other keyboard events', () => {
			const event = createKeyboardEvent( { key: 'z', code: 'KeyZ' } );

			stopUndoRedoKeyboardShortcutPropagation( event );

			expect( event.stopPropagation ).not.toHaveBeenCalled();
			expect( event.preventDefault ).not.toHaveBeenCalled();
		} );
	} );
} );
