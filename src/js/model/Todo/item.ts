/*******************************************************************************
 * Copyright (C) 2013-2015 Martin Gill
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

/// <reference path="token.ts" />
/// <reference path="Metadata/GenericMetadata.ts" />

namespace TodoTxtJs.TodoItems
{
    export class Item
    {
        private tokens: Token[];

        constructor(tokens: Token[])
        {
            if (tokens === null)
            {
                throw "No tokens given";
            }

            this.tokens = tokens;
        }

        public completed(): boolean
        {
            return this.findTokens(TokenType.completed).length == 1;
        }

        public completedDate(): string
        {
            var tokens = this.findTokens(TokenType.completed);
            if (tokens.length == 0) return null;
            return tokens[0].text;
        }

        public priority(): string
        {
            var tokens = this.findTokens(TokenType.priority);
            if (tokens.length == 0) return null;
            return tokens[0].text;
        }

        public createDate(): string
        {
            var tokens = this.findTokens(TokenType.createDate);
            if (tokens.length == 0) return null;
            return tokens[0].text;
        }

        public projects(): string[]
        {
            var tokens = this.findTokens(TokenType.project);
            return tokens.map(function(item) { return item.text });
        }

        public contexts(): string[]
        {
            var tokens = this.findTokens(TokenType.context);
            return tokens.map(function(item) { return item.text });
        }

        public metadata(): Metadata.GenericMetadata[]
        {
            return this.findTokens(TokenType.metadata);
        }

        private findTokens(type: TokenType) : Token[]
        {
            return this.tokens.filter(function(item) { return item.type == type; });
        }
    }
}