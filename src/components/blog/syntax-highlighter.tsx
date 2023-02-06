'use client';

import { Prism } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const SyntaxHighlighter = ({
    code,
    language,
}: {
    code: string;
    language: string;
}) => (
    <Prism language={language} style={oneDark}>
        {code}
    </Prism>
);
