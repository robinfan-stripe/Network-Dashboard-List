import { useState, useRef, useCallback, useEffect } from 'react';
import { Icon } from '../icons/SailIcons';
import Switch from './Switch';
import Dialog from './Dialog';

// --- Primitives ---

export const ControlPanelButton = ({ onClick, active, className, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm font-medium rounded-lg w-full bg-button-secondary-bg hover:bg-button-secondary-bg-hover border border-border cursor-pointer transition-colors ${active
      ? 'bg-button-primary-bg text-button-primary-text'
      : 'text-default hover:bg-offset'
      } ${className || ''}`}
  >
    {children}
  </button>
);

const ControlPanelHeader = ({ minimized, onToggle }) => (
  <div
    onClick={onToggle}
    className="flex items-center justify-between gap-4 px-3 py-2 cursor-pointer transition-colors hover:bg-offset"
  >
    <span className="text-sm font-medium text-default">
      Prototype controls
    </span>
    <button className="text-icon-default hover:text-icon-subdued cursor-pointer transition-colors">
      <Icon name="chevronDown" size="xxsmall" fill="currentColor" className={`w-[8px] h-[8px] transition-transform ${minimized ? 'rotate-180' : ''}`} />
    </button>
  </div>
);

const ControlPanelBody = ({ minimized, children }) => (
  <div
    className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${minimized ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}
  >
    <div className="overflow-hidden w-full">
      <div className="flex flex-col w-full items-center gap-3 px-3 py-2 text-icon-default">
        {children}
      </div>
    </div>
  </div>
);

// --- Drag constants ---

const MARGIN = 8;
const PANEL_WIDTH = 230;

const DropZone = ({ snapSide, panelRef }) => {
  const height = panelRef.current?.offsetHeight || 40;
  const leftPos = MARGIN;
  const rightPos = window.innerWidth - PANEL_WIDTH - MARGIN;
  const isLeftActive = snapSide === 'left';

  const shared = { bottom: MARGIN, width: PANEL_WIDTH, height, position: 'fixed' };

  return (
    <>
      {/* Left drop zone */}
      <div
        className={`z-[99] rounded-lg transition-all duration-200 ${isLeftActive
          ? 'border-2 border-brand bg-brand/5'
          : 'border border-border bg-offset border-dashed'
          }`}
        style={{ ...shared, left: leftPos }}
      />
      {/* Right drop zone */}
      <div
        className={`z-[99] rounded-lg transition-all duration-200 ${!isLeftActive
          ? 'border-2 border-brand bg-brand/5'
          : 'border border-border bg-offset border-dashed'
          }`}
        style={{ ...shared, left: rightPos }}
      />
    </>
  );
};

function useDragSnap() {
  const panelRef = useRef(null);
  const [side, setSide] = useState('left');
  const [dragging, setDragging] = useState(false);
  const [dragPos, setDragPos] = useState(null); // { left, bottom } during drag
  const [snapTarget, setSnapTarget] = useState('left');
  const dragStart = useRef(null);
  const didDrag = useRef(false);

  const getSnapSide = (left) => {
    const panelCenter = left + PANEL_WIDTH / 2;
    return panelCenter < window.innerWidth / 2 ? 'left' : 'right';
  };

  const getSnapLeft = (s) =>
    s === 'left' ? MARGIN : window.innerWidth - PANEL_WIDTH - MARGIN;

  const onPointerDown = useCallback((e) => {
    if (e.target.closest('button, input, label, [role="switch"]')) return;

    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragStart.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      panelLeft: rect.left,
      panelBottom: window.innerHeight - rect.bottom,
    };
    didDrag.current = false;
    setDragging(true);
    setDragPos({ left: rect.left, bottom: window.innerHeight - rect.bottom });
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onPointerMove = (e) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.pointerX;
      const dy = e.clientY - dragStart.current.pointerY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        didDrag.current = true;
      }
      const newLeft = dragStart.current.panelLeft + dx;
      const newBottom = dragStart.current.panelBottom - dy;
      setDragPos({ left: newLeft, bottom: newBottom });
      setSnapTarget(getSnapSide(newLeft));
    };

    const onPointerUp = () => {
      if (didDrag.current) {
        const newSide = snapTarget;
        setSide(newSide);
      }
      setDragging(false);
      setDragPos(null);
      dragStart.current = null;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [dragging, snapTarget]);

  // Resting position
  const restLeft = getSnapLeft(side);
  const restBottom = MARGIN;

  return { side, dragging, dragPos, snapTarget, restLeft, restBottom, panelRef, onPointerDown, didDrag };
}

// --- Sections (add your own controls here) ---

const InfoBanner = () => (
  <div className="flex flex-col gap-2 w-full p-3 bg-offset rounded-lg">
    <Icon name="info" size="xxsmall" fill="currentColor" />
    <p className="text-sm text-subdued">Use this space to add controls for your prototype. You can also drag the panel to other side!</p>
  </div>
);

const ContextDialog = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    title="Project context"
    subtitle="Add context about your prototype for viewers."
    size="full"
    overlayClassName="z-[101]"
  >
    <div className="flex gap-4 w-full bg-offset rounded-lg mx-auto px-4 py-32">
      <p className="text-base text-subdued max-w-[700px] mx-auto text-center">
        Use this dialog to share context about the project or work shown in this prototype. You can describe the problem being solved, the target audience, key decisions, or anything else that helps viewers understand what they're looking at.
      </p>
    </div>
  </Dialog>
);

// --- Main component ---

export default function ControlPanel({ darkMode, onToggleDarkMode }) {
  const [minimized, setMinimized] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const { dragging, dragPos, snapTarget, restLeft, restBottom, panelRef, onPointerDown, didDrag } = useDragSnap();

  const style = dragging && dragPos
    ? { left: dragPos.left, bottom: dragPos.bottom, transition: 'none' }
    : { left: restLeft, bottom: restBottom, transition: 'left 0.25s ease, bottom 0.25s ease' };

  return (
    <>
      {dragging && didDrag.current && (
        <DropZone snapSide={snapTarget} panelRef={panelRef} />
      )}

      <div
        ref={panelRef}
        onPointerDown={onPointerDown}
        className={`fixed z-[100] bg-surface rounded-lg shadow-lg overflow-hidden w-[230px] border border-border select-none ${dragging ? 'cursor-grabbing' : ''}`}
        style={style}
      >
        <ControlPanelHeader
          minimized={minimized}
          onToggle={() => { if (!didDrag.current) setMinimized(!minimized); }}
        />
        <ControlPanelBody minimized={minimized}>
          <InfoBanner />
          <Switch
            checked={darkMode}
            onChange={onToggleDarkMode}
            label="Dark mode"
            className="w-full"
          />
          <ControlPanelButton onClick={() => setContextOpen(true)}>
            Show context
          </ControlPanelButton>
        </ControlPanelBody>
      </div>

      <ContextDialog open={contextOpen} onClose={() => setContextOpen(false)} />
    </>
  );
}
