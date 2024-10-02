// drowt.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs'
import path from 'path'
import { listFilesRecursivelyT, listFilesT } from './index'

vi.mock('fs')
vi.mock('path')

const mockConsoleLog = vi.fn()
console.log = mockConsoleLog

describe('drowt CLI tool', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('lists files in a directory', () => {
    const mockDirents = [
      { name: 'file1.js', isDirectory: () => false },
      { name: 'file2.ts', isDirectory: () => false },
    ]

    vi.spyOn(fs, 'readdirSync').mockReturnValue(mockDirents)
    vi.spyOn(path, 'basename').mockReturnValue('testDir')

    listFilesT('/test/path')

    expect(mockConsoleLog).toHaveBeenCalledWith('[ directory: testDir ]')
    expect(mockConsoleLog).toHaveBeenCalledWith('--  /file1.js')
    expect(mockConsoleLog).toHaveBeenCalledWith('--  /file2.ts')
  })

  it('lists files recursively', () => {
    const mockDirents = [
      { name: 'file1.js', isDirectory: () => false },
      { name: 'subDir', isDirectory: () => true },
    ]

    const mockSubDirents = [{ name: 'file2.ts', isDirectory: () => false }]

    vi.spyOn(fs, 'readdirSync').mockReturnValueOnce(mockDirents).mockReturnValueOnce(mockSubDirents)

    vi.spyOn(path, 'basename').mockReturnValueOnce('testDir').mockReturnValueOnce('subDir')

    vi.spyOn(path, 'join').mockReturnValue('/test/path/subDir')

    listFilesRecursivelyT('/test/path')

    expect(mockConsoleLog).toHaveBeenCalledWith('[ directory: testDir ]')
    expect(mockConsoleLog).toHaveBeenCalledWith('--  /file1.js')
    expect(mockConsoleLog).toHaveBeenCalledWith('--  [ directory: subDir ]')
    expect(mockConsoleLog).toHaveBeenCalledWith('--  --  /file2.ts')
  })

  it('lists file names only', () => {
    const mockDirents = [
      { name: 'file1.js', isDirectory: () => false },
      { name: 'file2.ts', isDirectory: () => false },
    ]

    vi.spyOn(fs, 'readdirSync').mockReturnValue(mockDirents)

    listFilesT('/test/path', true)

    expect(mockConsoleLog).toHaveBeenCalledWith('file1.js\nfile2.ts')
  })

  it('lists file names recursively', () => {
    const mockDirents = [
      { name: 'file1.js', isDirectory: () => false },
      { name: 'subDir', isDirectory: () => true },
    ]

    const mockSubDirents = [{ name: 'file2.ts', isDirectory: () => false }]

    vi.spyOn(fs, 'readdirSync').mockReturnValueOnce(mockDirents).mockReturnValueOnce(mockSubDirents)

    vi.spyOn(path, 'join').mockReturnValue('/test/path/subDir')

    listFilesRecursivelyT('/test/path', 0, true)

    expect(mockConsoleLog).toHaveBeenCalledWith('file1.js')
    expect(mockConsoleLog).toHaveBeenCalledWith('file2.ts')
  })
})
